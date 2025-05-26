
```
# Quranic Arabic Trainer 2

## Projektbeskrivelse

Dette projekt er en platform til at lære koranisk arabisk. 

## Nye Komponenter

### `TafsirSection`
Viser tafsir-information for et givent koranvers eller -afsnit.
- **Props**: `surahId: string`, `ayahId?: string` (valgfri)
- **Funktionalitet**: Henter og viser tafsir-data, håndterer loading- og fejltilstande.

### `ComparativeStudySection`
Tillader sammenlignende studie af forskellige oversættelser eller tafsirer.
- **Props**: `surahId: string`, `ayahId?: string` (valgfri)
- **Funktionalitet**: Henter og viser data til sammenlignende studie, håndterer loading- og fejltilstande.

### `ThematicExplorationSection`
Muliggør tematisk udforskning af Koranen.
- **Props**: `themeId: string` (eller lignende prop til at identificere temaet)
- **Funktionalitet**: Henter og viser data relateret til et specifikt tema, håndterer loading- og fejltilstande.

## Mappestruktur

quranic-arabic-trainer-2
├─ .next
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .rscinfo
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_aarch64_8.0.0
│  │  └─ webpack
│  │     ├─ client-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 10.pack.gz
│  │     │  ├─ 11.pack.gz
│  │     │  ├─ 12.pack.gz
│  │     │  ├─ 13.pack.gz
│  │     │  ├─ 14.pack.gz
│  │     │  ├─ 15.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ 9.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ client-development-fallback
│  │     │  ├─ 0.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ server-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 10.pack.gz
│  │     │  ├─ 11.pack.gz
│  │     │  ├─ 12.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ 9.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-production
│  │        ├─ 0.pack
│  │        └─ index.pack
│  ├─ fallback-build-manifest.json
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
│  │  ├─ _error.js
│  │  ├─ app
│  │  │  ├─ _not-found
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ alphabet
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ manifest.webmanifest
│  │  │  │  ├─ route.js
│  │  │  │  └─ route_client-reference-manifest.js
│  │  │  ├─ page.js
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ _app.js
│  │  │  ├─ _document.js
│  │  │  └─ _error.js
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  ├─ vendor-chunks
│  │  │  ├─ @floating-ui+core@1.7.0.js
│  │  │  ├─ @floating-ui+dom@1.7.0.js
│  │  │  ├─ @floating-ui+react-dom@2.1.2_react-dom@19.1.0_react@19.1.0__react@19.1.0.js
│  │  │  ├─ @floating-ui+utils@0.2.9.js
│  │  │  ├─ @radix-ui+primitive@1.1.1.js
│  │  │  ├─ @radix-ui+react-arrow@1.1.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@1_12fe1e1085e195cf0683cfce7d3adb96.js
│  │  │  ├─ @radix-ui+react-avatar@1.1.2_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@_30315a37dbb102943255fe70da706b87.js
│  │  │  ├─ @radix-ui+react-collection@1.1.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+re_1fb4b9529f929dd02b7897e077229d03.js
│  │  │  ├─ @radix-ui+react-compose-refs@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-compose-refs@1.1.2_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-context@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-context@1.1.2_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-dialog@1.1.4_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@_fae02e8b2743814b42549494a3e5c591.js
│  │  │  ├─ @radix-ui+react-direction@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-dismissable-layer@1.1.3_@types+react-dom@19.1.5_@types+react@19.1.4__@t_ddb2e391162b1c51556ac1f8b5d28930.js
│  │  │  ├─ @radix-ui+react-dropdown-menu@2.1.4_@types+react-dom@19.1.5_@types+react@19.1.4__@types_c20e02b3e0c812eeb2af17a44a7b4067.js
│  │  │  ├─ @radix-ui+react-focus-guards@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-focus-scope@1.1.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+r_e29235eda86fe0f92c1e98c2211d763c.js
│  │  │  ├─ @radix-ui+react-id@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-id@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-menu@2.1.4_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@19_45f893058b379553150f1aa7a0f0b6a7.js
│  │  │  ├─ @radix-ui+react-popper@1.2.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@_910688d4f3cb83ecf698ad7ae3e1c893.js
│  │  │  ├─ @radix-ui+react-portal@1.1.3_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@_9293d93129239ba2c4dd77e1548b17d3.js
│  │  │  ├─ @radix-ui+react-presence@1.1.2_@types+react-dom@19.1.5_@types+react@19.1.4__@types+reac_cf404f2765adb4b6877f4e8a2d692386.js
│  │  │  ├─ @radix-ui+react-primitive@2.0.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+rea_cfb4d79a5b3ebf373dc69b2d58bc79b3.js
│  │  │  ├─ @radix-ui+react-primitive@2.1.2_@types+react-dom@19.1.5_@types+react@19.1.4__@types+rea_7b933c94c4e5e4ade0d694d5b36d9593.js
│  │  │  ├─ @radix-ui+react-progress@1.1.6_@types+react-dom@19.1.5_@types+react@19.1.4__@types+reac_6fbf669f5c090fe74335dc4530bf548d.js
│  │  │  ├─ @radix-ui+react-roving-focus@1.1.1_@types+react-dom@19.1.5_@types+react@19.1.4__@types+_be2e1e0121ae936d3c9bf04fd1c4493f.js
│  │  │  ├─ @radix-ui+react-slot@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-slot@1.2.2_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-tabs@1.1.2_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@19_a639b88c63d21cde8799e42d96c8096f.js
│  │  │  ├─ @radix-ui+react-use-callback-ref@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-use-controllable-state@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-use-escape-keydown@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-use-layout-effect@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-use-layout-effect@1.1.1_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @radix-ui+react-use-size@1.1.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ @swc+helpers@0.5.15.js
│  │  │  ├─ aria-hidden@1.2.6.js
│  │  │  ├─ class-variance-authority@0.7.1.js
│  │  │  ├─ clsx@2.1.1.js
│  │  │  ├─ cmdk@1.0.4_@types+react-dom@19.1.5_@types+react@19.1.4__@types+react@19.1.4_react-dom@19.1.0_react@19.1.0__react@19.1.0.js
│  │  │  ├─ get-nonce@1.0.1.js
│  │  │  ├─ lucide-react@0.454.0_react@19.1.0.js
│  │  │  ├─ next-themes@0.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0.js
│  │  │  ├─ next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0.js
│  │  │  ├─ react-remove-scroll-bar@2.3.8_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ react-remove-scroll@2.7.0_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ react-style-singleton@2.2.3_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ tailwind-merge@2.6.0.js
│  │  │  ├─ tslib@2.8.1.js
│  │  │  ├─ use-callback-ref@1.3.3_@types+react@19.1.4_react@19.1.0.js
│  │  │  ├─ use-sidecar@1.1.3_@types+react@19.1.4_react@19.1.0.js
│  │  │  └─ use-sync-external-store@1.5.0_react@19.1.0.js
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ _error.js
│  │  │  ├─ app
│  │  │  │  ├─ _not-found
│  │  │  │  │  └─ page.js
│  │  │  │  ├─ alphabet
│  │  │  │  │  └─ page.js
│  │  │  │  ├─ layout.js
│  │  │  │  ├─ loading.js
│  │  │  │  ├─ manifest.webmanifest
│  │  │  │  │  └─ route.js
│  │  │  │  └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ fallback
│  │  │  │  ├─ amp.js
│  │  │  │  ├─ main-app.js
│  │  │  │  ├─ main.js
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ _app.js
│  │  │  │  │  └─ _error.js
│  │  │  │  ├─ react-refresh.js
│  │  │  │  └─ webpack.js
│  │  │  ├─ main-app.js
│  │  │  ├─ main.js
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  └─ _error.js
│  │  │  ├─ polyfills.js
│  │  │  ├─ react-refresh.js
│  │  │  └─ webpack.js
│  │  ├─ css
│  │  │  └─ app
│  │  │     └─ layout.css
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media
│  │  │  ├─ 26a46d62cd723877-s.woff2
│  │  │  ├─ 55c55f0601d81cf3-s.woff2
│  │  │  ├─ 581909926a08bbc8-s.woff2
│  │  │  ├─ 6c53a2ef68e5063c-s.p.ttf
│  │  │  ├─ 6d93bde91c0c2823-s.woff2
│  │  │  ├─ 97e0cb1ae144a2a9-s.woff2
│  │  │  ├─ a34f9d1faa5f3315-s.p.woff2
│  │  │  ├─ b68fae107ed40d4c-s.p.ttf
│  │  │  └─ df0a9ae256c0569c-s.woff2
│  │  └─ webpack
│  │     ├─ 072d5fe03ffc9680.webpack.hot-update.json
│  │     ├─ 0fdc567e56d8f8c1.webpack.hot-update.json
│  │     ├─ 14c67a1668d138d8.webpack.hot-update.json
│  │     ├─ 164f691d089c176d.webpack.hot-update.json
│  │     ├─ 1f585815618cd5bd.webpack.hot-update.json
│  │     ├─ 39dd996ae22d0e16.webpack.hot-update.json
│  │     ├─ 420332a898525aa7.webpack.hot-update.json
│  │     ├─ 4891376c87c4558f.webpack.hot-update.json
│  │     ├─ 4df7010463815e2a.webpack.hot-update.json
│  │     ├─ 534e86e148d43d44.webpack.hot-update.json
│  │     ├─ 5455a4eb28516ffd.webpack.hot-update.json
│  │     ├─ 54b51a4df43c9226.webpack.hot-update.json
│  │     ├─ 62b173080d1cc0f3.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ 6821065dff4fb8fd.webpack.hot-update.json
│  │     ├─ 69260cf55fd39d0a.webpack.hot-update.json
│  │     ├─ 6f9ec1d7d2f486db.webpack.hot-update.json
│  │     ├─ 782baad0a5229bc3.webpack.hot-update.json
│  │     ├─ 7d46150ee5292ff6.webpack.hot-update.json
│  │     ├─ 8d8a604b684ab730.webpack.hot-update.json
│  │     ├─ 91eca637633023a8.webpack.hot-update.json
│  │     ├─ 97f1e28675995897.webpack.hot-update.json
│  │     ├─ ac323c1e6a22bb1e.webpack.hot-update.json
│  │     ├─ ace888855a701d5f.webpack.hot-update.json
│  │     ├─ app
│  │     │  ├─ alphabet
│  │     │  │  ├─ page.0fdc567e56d8f8c1.hot-update.js
│  │     │  │  ├─ page.69260cf55fd39d0a.hot-update.js
│  │     │  │  ├─ page.6f9ec1d7d2f486db.hot-update.js
│  │     │  │  ├─ page.7d46150ee5292ff6.hot-update.js
│  │     │  │  └─ page.b1f7bc8e8a9ad317.hot-update.js
│  │     │  ├─ layout.072d5fe03ffc9680.hot-update.js
│  │     │  ├─ layout.14c67a1668d138d8.hot-update.js
│  │     │  ├─ layout.164f691d089c176d.hot-update.js
│  │     │  ├─ layout.420332a898525aa7.hot-update.js
│  │     │  ├─ layout.4891376c87c4558f.hot-update.js
│  │     │  ├─ layout.54b51a4df43c9226.hot-update.js
│  │     │  ├─ layout.62b173080d1cc0f3.hot-update.js
│  │     │  ├─ layout.6821065dff4fb8fd.hot-update.js
│  │     │  ├─ layout.69260cf55fd39d0a.hot-update.js
│  │     │  ├─ layout.6f9ec1d7d2f486db.hot-update.js
│  │     │  ├─ layout.782baad0a5229bc3.hot-update.js
│  │     │  ├─ layout.97f1e28675995897.hot-update.js
│  │     │  ├─ layout.ac323c1e6a22bb1e.hot-update.js
│  │     │  ├─ layout.ace888855a701d5f.hot-update.js
│  │     │  ├─ layout.bf033a4d79242987.hot-update.js
│  │     │  ├─ layout.cfdf525962a04a94.hot-update.js
│  │     │  ├─ layout.d1c1097470f347f5.hot-update.js
│  │     │  ├─ layout.ddcf3acbb8701fbb.hot-update.js
│  │     │  ├─ layout.e7da7beb5f94ba33.hot-update.js
│  │     │  ├─ page.0fdc567e56d8f8c1.hot-update.js
│  │     │  ├─ page.69260cf55fd39d0a.hot-update.js
│  │     │  ├─ page.6f9ec1d7d2f486db.hot-update.js
│  │     │  ├─ page.97f1e28675995897.hot-update.js
│  │     │  ├─ page.d02af11e446304a2.hot-update.js
│  │     │  └─ page.d1c1097470f347f5.hot-update.js
│  │     ├─ b1f7bc8e8a9ad317.webpack.hot-update.json
│  │     ├─ bf033a4d79242987.webpack.hot-update.json
│  │     ├─ ce4959784706144c.webpack.hot-update.json
│  │     ├─ cfdf525962a04a94.webpack.hot-update.json
│  │     ├─ d02af11e446304a2.webpack.hot-update.json
│  │     ├─ d1c1097470f347f5.webpack.hot-update.json
│  │     ├─ d505a66eb37bd4e5.webpack.hot-update.json
│  │     ├─ ddcf3acbb8701fbb.webpack.hot-update.json
│  │     ├─ e7da7beb5f94ba33.webpack.hot-update.json
│  │     ├─ webpack.072d5fe03ffc9680.hot-update.js
│  │     ├─ webpack.0fdc567e56d8f8c1.hot-update.js
│  │     ├─ webpack.14c67a1668d138d8.hot-update.js
│  │     ├─ webpack.164f691d089c176d.hot-update.js
│  │     ├─ webpack.1f585815618cd5bd.hot-update.js
│  │     ├─ webpack.39dd996ae22d0e16.hot-update.js
│  │     ├─ webpack.420332a898525aa7.hot-update.js
│  │     ├─ webpack.4891376c87c4558f.hot-update.js
│  │     ├─ webpack.4df7010463815e2a.hot-update.js
│  │     ├─ webpack.534e86e148d43d44.hot-update.js
│  │     ├─ webpack.5455a4eb28516ffd.hot-update.js
│  │     ├─ webpack.54b51a4df43c9226.hot-update.js
│  │     ├─ webpack.62b173080d1cc0f3.hot-update.js
│  │     ├─ webpack.6821065dff4fb8fd.hot-update.js
│  │     ├─ webpack.69260cf55fd39d0a.hot-update.js
│  │     ├─ webpack.6f9ec1d7d2f486db.hot-update.js
│  │     ├─ webpack.782baad0a5229bc3.hot-update.js
│  │     ├─ webpack.7d46150ee5292ff6.hot-update.js
│  │     ├─ webpack.8d8a604b684ab730.hot-update.js
│  │     ├─ webpack.91eca637633023a8.hot-update.js
│  │     ├─ webpack.97f1e28675995897.hot-update.js
│  │     ├─ webpack.ac323c1e6a22bb1e.hot-update.js
│  │     ├─ webpack.ace888855a701d5f.hot-update.js
│  │     ├─ webpack.b1f7bc8e8a9ad317.hot-update.js
│  │     ├─ webpack.bf033a4d79242987.hot-update.js
│  │     ├─ webpack.ce4959784706144c.hot-update.js
│  │     ├─ webpack.cfdf525962a04a94.hot-update.js
│  │     ├─ webpack.d02af11e446304a2.hot-update.js
│  │     ├─ webpack.d1c1097470f347f5.hot-update.js
│  │     ├─ webpack.d505a66eb37bd4e5.hot-update.js
│  │     ├─ webpack.ddcf3acbb8701fbb.hot-update.js
│  │     └─ webpack.e7da7beb5f94ba33.hot-update.js
│  ├─ trace
│  └─ types
│     ├─ app
│     │  ├─ alphabet
│     │  │  └─ page.ts
│     │  ├─ layout.ts
│     │  └─ page.ts
│     ├─ cache-life.d.ts
│     └─ package.json
├─ .repomix
│  └─ bundles.json
├─ Struktur.txt
├─ app
│  ├─ admin
│  │  └─ page.tsx
│  ├─ advanced-progression
│  │  └─ page.tsx
│  ├─ ai-feedback
│  │  └─ page.tsx
│  ├─ alphabet
│  │  └─ page.tsx
│  ├─ auth
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ register
│  │     └─ page.tsx
│  ├─ community
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ grammar
│  │  └─ page.tsx
│  ├─ kurser
│  │  └─ [kursusId]
│  │     └─ [fagId]
│  │        └─ [emneId]
│  │           └─ page.tsx
│  ├─ layout.tsx
│  ├─ learn
│  │  └─ vocabulary
│  │     └─ page.tsx
│  ├─ loading.tsx
│  ├─ manifest.ts
│  ├─ offline
│  │  ├─ error.tsx
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ performance
│  │  └─ page.tsx
│  ├─ practice
│  │  └─ quiz
│  │     └─ page.tsx
│  ├─ profile
│  │  └─ page.tsx
│  ├─ pronunciation
│  │  └─ page.tsx
│  ├─ quiz
│  │  └─ page.tsx
│  ├─ quiz-system
│  │  └─ page.tsx
│  ├─ quran
│  │  ├─ advanced-study
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ loading.tsx
│  │  ├─ page.tsx
│  │  └─ study
│  │     └─ [surahId]
│  │        ├─ error.tsx
│  │        ├─ loading.tsx
│  │        └─ page.tsx
│  ├─ settings
│  │  ├─ error.tsx
│  │  ├─ loading.tsx
│  │  └─ page.tsx
│  ├─ sw.ts
│  └─ vocabulary
│     └─ flashcards
│        └─ page.tsx
├─ components
│  ├─ admin-analytics-chart.tsx
│  ├─ admin-error-heatmap.tsx
│  ├─ ai-explain-overlay.tsx
│  ├─ ai-insight-card.tsx
│  ├─ command-menu.tsx
│  ├─ course-card.tsx
│  ├─ flashcard-stats.tsx
│  ├─ glassmorphism-header.tsx
│  ├─ level-progress-ring.tsx
│  ├─ main-nav.tsx
│  ├─ notification-popup.tsx
│  ├─ performance
│  │  ├─ code-splitting-example.tsx
│  │  ├─ lazy-loaded-component.tsx
│  │  ├─ optimized-image.tsx
│  │  ├─ performance-metrics.tsx
│  │  └─ resource-monitor.tsx
│  ├─ progress-ring.tsx
│  ├─ progress.tsx
│  ├─ quran-word-analysis.tsx
│  ├─ recent-activity-card.tsx
│  ├─ theme-provider.tsx
│  ├─ topic-discussion-thread.tsx
│  ├─ ui
│  │  ├─ accordion.tsx
│  │  ├─ alert-dialog.tsx
│  │  ├─ alert.tsx
│  │  ├─ aspect-ratio.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ breadcrumb.tsx
│  │  ├─ button.tsx
│  │  ├─ calendar.tsx
│  │  ├─ card.tsx
│  │  ├─ carousel.tsx
│  │  ├─ chart.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ collapsible.tsx
│  │  ├─ command.tsx
│  │  ├─ context-menu.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ form.tsx
│  │  ├─ hover-card.tsx
│  │  ├─ input-otp.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ menubar.tsx
│  │  ├─ navigation-menu.tsx
│  │  ├─ pagination.tsx
│  │  ├─ popover.tsx
│  │  ├─ progress.tsx
│  │  ├─ radio-group.tsx
│  │  ├─ resizable.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ slider.tsx
│  │  ├─ sonner.tsx
│  │  ├─ switch.tsx
│  │  ├─ table.tsx
│  │  ├─ tabs.tsx
│  │  ├─ textarea.tsx
│  │  ├─ toast.tsx
│  │  ├─ toaster.tsx
│  │  ├─ toggle-group.tsx
│  │  ├─ toggle.tsx
│  │  ├─ tooltip.tsx
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  └─ user-nav.tsx
├─ components.json
├─ fejl.txt
├─ hooks
│  ├─ use-mobile.tsx
│  ├─ use-performance.ts
│  └─ use-toast.ts
├─ lib
│  ├─ offline-storage.ts
│  ├─ performance-monitoring.ts
│  └─ utils.ts
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.mjs
├─ public
│  ├─ fonts
│  │  ├─ ScheherazadeNew-Bold.ttf
│  │  └─ ScheherazadeNew-Regular.ttf
│  ├─ placeholder-logo.png
│  ├─ placeholder-logo.svg
│  ├─ placeholder-user.jpg
│  ├─ placeholder.jpg
│  └─ placeholder.svg
├─ repomix-output.xml
├─ styles
│  └─ globals.css
├─ tailwind.config.js
└─ tsconfig.json

```