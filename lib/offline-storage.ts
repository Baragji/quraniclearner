// Forbedret offline-storage utility til at arbejde med IndexedDB

// Database konfiguration
const DB_NAME = "quranicArabicTrainer"
const DB_VERSION = 1

// Store navne
const STORES = {
  USER_DATA: "userData",
  PROGRESS: "progress",
  QURAN_DATA: "quranData",
  VOCABULARY: "vocabulary",
  OFFLINE_REQUESTS: "offlineRequests",
}

// Åbn databasen
export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB not supported"))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      reject(new Error("Error opening database"))
    }

    request.onsuccess = (event) => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = request.result

      // Opret stores, hvis de ikke findes
      if (!db.objectStoreNames.contains(STORES.USER_DATA)) {
        db.createObjectStore(STORES.USER_DATA, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
        db.createObjectStore(STORES.PROGRESS, { keyPath: "userId" })
      }

      if (!db.objectStoreNames.contains(STORES.QURAN_DATA)) {
        db.createObjectStore(STORES.QURAN_DATA, { keyPath: "surahId" })
      }

      if (!db.objectStoreNames.contains(STORES.VOCABULARY)) {
        const vocabStore = db.createObjectStore(STORES.VOCABULARY, { keyPath: "id", autoIncrement: true })
        vocabStore.createIndex("word", "word", { unique: false })
        vocabStore.createIndex("level", "level", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.OFFLINE_REQUESTS)) {
        db.createObjectStore(STORES.OFFLINE_REQUESTS, { keyPath: "id", autoIncrement: true })
      }
    }
  })
}

// Generisk funktion til at gemme data
export const storeData = <T>(storeName: string, data: T): Promise<IDBValidKey> => {\
  return new Promise(async (resolve, reject) => {\
    try {\
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.put(data);
      
      request.onsuccess = () => {\
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(new Error(`Error storing data in ${storeName}\`));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Generisk funktion til at hente data
export const getData = <T>(storeName: string, key: IDBValidKey): Promise<T | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      
      const request = store.get(key);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = () => {
        reject(new Error(\`Error getting data from ${storeName}\`));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Generisk funktion til at hente alle data
export const getAllData = <T>(storeName: string): Promise<T[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => {
        reject(new Error(\`Error getting all data from ${storeName}\`));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Generisk funktion til at slette data
export const deleteData = (storeName: string, key: IDBValidKey): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.delete(key);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(\`Error deleting data from ${storeName}\`));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Funktion til at gemme offline anmodninger
export const storeOfflineRequest = (request: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}): Promise<IDBValidKey> => {
  return storeData(STORES.OFFLINE_REQUESTS, {
    ...request,
    timestamp: Date.now(),
  });
};

// Funktion til at hente alle offline anmodninger
export const getOfflineRequests = (): Promise<any[]> => {
  return getAllData(STORES.OFFLINE_REQUESTS);
};

// Funktion til at slette en offline anmodning
export const deleteOfflineRequest = (id: IDBValidKey): Promise<void> => {
  return deleteData(STORES.OFFLINE_REQUESTS, id);
};

// Funktion til at synkronisere offline anmodninger
export const syncOfflineRequests = async (): Promise<{ success: number; failed: number }> => {
  try {
    const requests = await getOfflineRequests();
    
    if (requests.length === 0) {
      return { success: 0, failed: 0 };
    }
    
    console.log(\`Syncing ${requests.length} offline requests\`);
    
    const results = await Promise.all(
      requests.map(async (req) => {
        try {
          const response = await fetch(req.url, {
            method: req.method,
            headers: req.headers,
            body: req.body,
          });
          
          if (response.ok) {
            await deleteOfflineRequest(req.id);
            return { success: true };
          } else {
            return { success: false };
          }
        } catch (error) {
          return { success: false };
        }
      })
    );
    
    const success = results.filter((r) => r.success).length;
    const failed = results.length - success;
    
    return { success, failed };
  } catch (error) {
    console.error('Error syncing offline requests:', error);
    return { success: 0, failed: 0 };
  }
};

// Funktion til at registrere for synkronisering
export const registerForSync = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-offline-data');
      return true;
    } catch (error) {
      console.error('Error registering for sync:', error);
      return false;
    }
  }
  return false;
};

// Hjælpefunktioner for specifikke datatyper

// Brugerdata
export const storeUserData = (userData: any): Promise<IDBValidKey> => {
  return storeData(STORES.USER_DATA, userData);
};

export const getUserData = (userId: string): Promise<any | null> => {
  return getData(STORES.USER_DATA, userId);
};

// Fremskridt
export const storeProgress = (progress: any): Promise<IDBValidKey> => {
  return storeData(STORES.PROGRESS, progress);
};

export const getProgress = (userId: string): Promise<any | null> => {
  return getData(STORES.PROGRESS, userId);
};

// Quran-data
export const storeQuranData = (quranData: any): Promise<IDBValidKey> => {
  return storeData(STORES.QURAN_DATA, quranData);
};

export const getQuranData = (surahId: number): Promise<any | null> => {
  return getData(STORES.QURAN_DATA, surahId);
};

export const getAllQuranData = (): Promise<any[]> => {
  return getAllData(STORES.QURAN_DATA);
};

// Ordforråd
export const storeVocabularyItem = (item: any): Promise<IDBValidKey> => {
  return storeData(STORES.VOCABULARY, item);
};

export const getVocabularyItem = (id: IDBValidKey): Promise<any | null> => {
  return getData(STORES.VOCABULARY, id);
};

export const getAllVocabulary = (): Promise<any[]> => {
  return getAllData(STORES.VOCABULARY);
};

// Funktion til at hente ordforråd efter niveau
export const getVocabularyByLevel = (level: number): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(STORES.VOCABULARY, 'readonly');
      const store = transaction.objectStore(STORES.VOCABULARY);
      const index = store.index('level');
      
      const request = index.getAll(level);
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => {
        reject(new Error('Error getting vocabulary by level'));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Funktion til at søge i ordforråd
export const searchVocabulary = (query: string): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const allVocabulary = await getAllVocabulary();
      
      // Simpel søgning (i en rigtig app ville dette være mere avanceret)
      const results = allVocabulary.filter((item) => {
        const searchableText = \`${item.word} ${item.translation} ${item.transliteration}`.toLowerCase();\
        return searchableText.includes(query.toLowerCase());
      });
      
      resolve(results);
    } catch (error) {
      reject(error);\
    }\
  });
};

// Funktion til at kontrollere, om browseren understøtter offline funktionalitet
export const supportsOfflineFeatures = (): boolean => {\
  return (\
    'serviceWorker' in navigator &&
    'indexedDB' in window &&
    'caches' in window
  );
};

// Funktion til at estimere offline lagerplads\
export const estimateOfflineStorage = async (): Promise<{ quota: number; usage: number; percent: number } | null> => {
  if (\'storage' in navigator && 'estimate' in navigator.storage) {
    try {\
      const estimate = await navigator.storage.estimate();
      return {\
        quota: estimate.quota || 0,
        usage: estimate.usage || 0,
        percent: estimate.quota ? ((estimate.usage || 0) / estimate.quota) * 100 : 0,
      };
    } catch (error) {
      console.error('Error estimating storage:', error);\
      return null;
    }
  }
  return null;
};

// Funktion til at anmode om vedvarende lagerplads
export const requestPersistentStorage = async (): Promise<boolean> => {
  if (\'storage' in navigator && 'persist' in navigator.storage) {
    try {\
      return await navigator.storage.persist();
    } catch (error) {
      console.error('Error requesting persistent storage:', error);\
      return false;
    }
  }
  return false;
};

// Funktion til at kontrollere, om lagerplads er vedvarende
export const isPersistentStorage = async (): Promise<boolean> => {
  if (\'storage' in navigator && 'persisted' in navigator.storage) {
    try {\
      return await navigator.storage.persisted();
    } catch (error) {
      console.error('Error checking persistent storage:', error);\
      return false;
    }
  }
  return false;
};

// Funktion til at rydde cache
export const clearCache = async (cacheName?: string): Promise<boolean> => {
  if ('caches' in window) {
    try {
      if (cacheName) {
        await caches.delete(cacheName);
      } else {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  }
  return false;
};

// Funktion til at kontrollere netværksstatus
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Event listener til at registrere offline/online status ændringer
export const registerNetworkStatusListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
): () => void => {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  // Returner en funktion til at fjerne event listeners
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
};
