// Forbedret service worker med avancerede caching-strategier
// Denne fil implementerer forskellige caching-strategier for forskellige typer af ressourcer

// Definer cache navne og versioner
const STATIC_CACHE_NAME = "quranic-arabic-trainer-static-v1"
const DYNAMIC_CACHE_NAME = "quranic-arabic-trainer-dynamic-v1"
const QURAN_CACHE_NAME = "quranic-arabic-trainer-quran-v1"
const API_CACHE_NAME = "quranic-arabic-trainer-api-v1"

// Ressourcer, der skal caches ved installation (app shell)
const APP_SHELL_RESOURCES = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/fonts/ScheherazadeNew-Regular.ttf",
  "/fonts/ScheherazadeNew-Bold.ttf",
]

// Quran-relaterede ressourcer, der skal precaches
const QURAN_RESOURCES = [
  // Disse ville være specifikke Quran-sider eller ressourcer
  "/quran/1",
  "/quran/2",
  "/quran/data/surah-1.json",
  "/quran/data/surah-2.json",
]

// Installer service worker og cache app shell
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    Promise.all([
      // Cache app shell
      caches
        .open(STATIC_CACHE_NAME)
        .then((cache) => {
          console.log("[Service Worker] Caching app shell")
          return cache.addAll(APP_SHELL_RESOURCES)
        }),

      // Cache Quran resources
      caches
        .open(QURAN_CACHE_NAME)
        .then((cache) => {
          console.log("[Service Worker] Caching Quran resources")
          return cache.addAll(QURAN_RESOURCES)
        }),
    ]),
  )
})

// Aktivér service worker og ryd gamle caches
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE_NAME &&
            cacheName !== QURAN_CACHE_NAME &&
            cacheName !== API_CACHE_NAME
          ) {
            console.log("[Service Worker] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )

  // Claim clients så service worker overtager kontrol med det samme
  return (self as any).clients.claim()
})

// Hjælpefunktion til at bestemme, om en anmodning er en API-anmodning
const isApiRequest = (request: Request) => {
  const url = new URL(request.url)
  return url.pathname.startsWith("/api/")
}

// Hjælpefunktion til at bestemme, om en anmodning er en Quran-ressource
const isQuranResource = (request: Request) => {
  const url = new URL(request.url)
  return url.pathname.startsWith("/quran/")
}

// Hjælpefunktion til at bestemme, om en anmodning er en statisk ressource
const isStaticResource = (request: Request) => {
  const url = new URL(request.url)
  return (
    url.pathname.match(/\.(js|css|woff2|ttf|woff|eot|svg|png|jpg|jpeg|gif|webp)$/) ||
    APP_SHELL_RESOURCES.includes(url.pathname)
  )
}

// Stale-while-revalidate strategi for API-anmodninger
const staleWhileRevalidate = async (request: Request, cacheName: string) => {
  const cachedResponse = await caches.match(request)

  const fetchPromise = fetch(request)
    .then((response) => {
      // Kontrollér, om responsen er gyldig
      if (!response || response.status !== 200 || response.type !== "basic") {
        return response
      }

      // Klone responsen, da den kun kan bruges én gang
      const responseToCache = response.clone()

      // Åbn cachen og gem den nye respons
      caches.open(cacheName).then((cache) => {
        cache.put(request, responseToCache)
      })

      return response
    })
    .catch((error) => {
      console.error("[Service Worker] Fetch failed:", error)
      // Returner cachedResponse, hvis den findes, ellers null
      return cachedResponse || null
    })

  // Returner cachedResponse med det samme, hvis den findes
  return cachedResponse || fetchPromise
}

// Cache-first strategi for statiske ressourcer
const cacheFirst = async (request: Request, cacheName: string) => {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const response = await fetch(request)

    // Kontrollér, om responsen er gyldig
    if (!response || response.status !== 200 || response.type !== "basic") {
      return response
    }

    // Klone responsen, da den kun kan bruges én gang
    const responseToCache = response.clone()

    // Åbn cachen og gem den nye respons
    const cache = await caches.open(cacheName)
    cache.put(request, responseToCache)

    return response
  } catch (error) {
    console.error("[Service Worker] Fetch failed:", error)

    // Hvis det er en navigationsanmodning, returner offline-siden
    if (request.mode === "navigate") {
      const offlineCache = await caches.open(STATIC_CACHE_NAME)
      return offlineCache.match("/offline")
    }

    return null
  }
}

// Network-first strategi for dynamiske ressourcer
const networkFirst = async (request: Request, cacheName: string) => {
  try {
    const response = await fetch(request)

    // Kontrollér, om responsen er gyldig
    if (!response || response.status !== 200) {
      throw new Error("Invalid response")
    }

    // Klone responsen, da den kun kan bruges én gang
    const responseToCache = response.clone()

    // Åbn cachen og gem den nye respons
    const cache = await caches.open(cacheName)
    cache.put(request, responseToCache)

    return response
  } catch (error) {
    console.log("[Service Worker] Falling back to cache for:", request.url)

    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Hvis det er en navigationsanmodning, returner offline-siden
    if (request.mode === "navigate") {
      const offlineCache = await caches.open(STATIC_CACHE_NAME)
      return offlineCache.match("/offline")
    }

    return null
  }
}

// Håndter fetch-anmodninger med forskellige strategier
self.addEventListener("fetch", (event: any) => {
  const request = event.request

  // Skip cross-origin anmodninger
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  // Vælg caching-strategi baseret på anmodningstype
  if (isApiRequest(request)) {
    // Stale-while-revalidate for API-anmodninger
    event.respondWith(staleWhileRevalidate(request, API_CACHE_NAME))
  } else if (isQuranResource(request)) {
    // Cache-first for Quran-ressourcer
    event.respondWith(cacheFirst(request, QURAN_CACHE_NAME))
  } else if (isStaticResource(request)) {
    // Cache-first for statiske ressourcer
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME))
  } else {
    // Network-first for alle andre anmodninger
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME))
  }
})

// Håndter synkronisering af offline data
self.addEventListener("sync", (event: any) => {
  if (event.tag === "sync-offline-data") {
    event.waitUntil(syncOfflineData())
  }
})

// Funktion til at synkronisere offline data
async function syncOfflineData() {
  try {
    // Hent offline data fra IndexedDB
    const db = await openDatabase()
    const offlineData = await getAllOfflineData(db)

    // Hvis der ikke er noget offline data, afslut
    if (offlineData.length === 0) {
      return
    }

    console.log("[Service Worker] Syncing offline data:", offlineData.length, "items")

    // Send hver offline data-element til serveren
    const syncPromises = offlineData.map(async (item) => {
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: item.headers,
          body: item.body,
        })

        if (response.ok) {
          // Hvis synkroniseringen lykkedes, fjern elementet fra IndexedDB
          await deleteOfflineData(db, item.id)
          return { success: true, id: item.id }
        } else {
          return { success: false, id: item.id, error: "Server returned error" }
        }
      } catch (error) {
        return { success: false, id: item.id, error: error.message }
      }
    })

    // Vent på, at alle synkroniseringer er færdige
    const results = await Promise.all(syncPromises)

    // Log resultater
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    console.log("[Service Worker] Sync completed:", successful, "successful,", failed, "failed")

    // Hvis der er fejlede synkroniseringer, planlæg en ny synkronisering
    if (failed > 0) {
      await (self as any).registration.sync.register("sync-offline-data")
    }
  } catch (error) {
    console.error("[Service Worker] Sync error:", error)
  }
}

// Hjælpefunktioner til at arbejde med IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("offlineData", 1)

    request.onupgradeneeded = (event) => {
      const db = request.result
      if (!db.objectStoreNames.contains("requests")) {
        db.createObjectStore("requests", { keyPath: "id", autoIncrement: true })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function getAllOfflineData(db: any) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("requests", "readonly")
    const store = transaction.objectStore("requests")
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function deleteOfflineData(db: any, id: number) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("requests", "readwrite")
    const store = transaction.objectStore("requests")
    const request = store.delete(id)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Håndter push-notifikationer
self.addEventListener("push", (event: any) => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: {
      url: data.url,
    },
    actions: data.actions || [],
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Håndter klik på notifikationer
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close()

  // Hvis der blev klikket på en handling
  if (event.action) {
    // Håndter forskellige handlinger
    switch (event.action) {
      case "open":
        event.waitUntil(clients.openWindow(event.notification.data.url))
        break
      case "dismiss":
        // Gør ingenting, notifikationen er allerede lukket
        break
      default:
        event.waitUntil(clients.openWindow(event.notification.data.url))
    }
  } else {
    // Standard handling, hvis der ikke blev klikket på en specifik handling
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})
