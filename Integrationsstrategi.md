Detaljeret Plan for Frontend-Backend Integration
Denne plan er designet til systematisk at færdiggøre backend API'en, rette kritiske frontend-fejl og etablere fuld integration mellem frontend (Next.js) og backend (NestJS) for Quranic Arabic Trainer.

Fase 0: Stabilisering af Frontend & Kodekvalitet
Mål: At sikre at frontend-projektet kan bygge uden fejl og at grundlæggende kodekvalitet er på plads.

Ret Kritiske JSX Fejl i app/alphabet/page.tsx:

Opgave: Gennemgå app/alphabet/page.tsx filen omhyggeligt.

Handling: Identificer og ret alle uafsluttede JSX-tags (f.eks. <div>, <main>, <Card>, <CardContent>, <span>). Sørg for korrekt nesting og lukning af alle elementer.

Verificering: Kør yarn workspace web dev (eller tilsvarende pnpm kommando for din frontend workspace) for at sikre, at siden kan rendere uden fejl i browseren.

Verificer calculatePercentage Import og Brug:

Opgave: Tjek alle steder hvor calculatePercentage fra lib/utils.ts bruges.

Handling: Sørg for korrekt import og anvendelse. Dette ser allerede ud til at være løst, men en hurtig verifikation er god.

Verificering: Ingen konsolfejl relateret til denne funktion under udvikling.

Kode Gennemgang (Valgfrit, men Anbefalet):

Opgave: Overvej en hurtig gennemgang af de mest aktive frontend-filer for andre åbenlyse fejl eller mangler i overensstemmelse med guidelines.md.

Handling: Kig efter "code smells", manglende fejlhåndtering, eller inkonsistens.

Fase 1: Færdiggørelse af Backend API (Kernefunktionalitet)
Mål: At designe og implementere fuldt funktionelle RESTful API-endpoints for alle kerneentiteter (Word, Verse, Lesson, Quiz).

For hver entitet (Word, Verse, Lesson, Quiz), gentag følgende trin:

Design API Endpoints:

Opgave: Definer specifikke RESTful endpoints (GET, POST, PUT, DELETE) for entiteten.

Eksempel for Word:

GET /api/words (hent alle ord, med paginering/filtrering)

GET /api/words/{id} (hent specifikt ord)

POST /api/words (opret nyt ord)

PUT /api/words/{id} (opdater ord)

DELETE /api/words/{id} (slet ord)

Handling: Dokumenter disse endpoints (f.eks. i api_udviklingsplan.md eller direkte med Swagger-kommentarer). Overvej query parametre for filtrering, sortering og paginering.

Opret NestJS Modul, Controller, Service & DTOs:

Opgave: Brug NestJS CLI til at generere de nødvendige filer.

Handling:

nest g module modules/<entity> (f.eks. modules/words)

nest g controller modules/<entity>/controllers/<entity>

nest g service modules/<entity>/services/<entity>

Opret DTOs manuelt i modules/<entity>/dtos/ (f.eks. create-word.dto.ts, update-word.dto.ts) med class-validator dekorationer.

Struktur: apps/api/src/modules/<entity>/...

Implementer Service Logik:

Opgave: Skriv forretningslogikken i <entity>.service.ts.

Handling:

Inject PrismaService.

Implementer CRUD-metoder der interagerer med Prisma (f.eks. prisma.word.create(), prisma.word.findMany()).

Implementer nødvendig validering (udover DTO-validering) og fejlhåndtering (f.eks. NotFoundException hvis en ressource ikke findes).

Implementer Controller Endpoints:

Opgave: Definer HTTP-handlers i <entity>.controller.ts.

Handling:

Brug korrekte HTTP-metode dekorationer (@Get(), @Post(), etc.).

Brug @Param() for ID'er og @Body() for request payloads (med DTO-validering).

Kald de tilsvarende service-metoder.

Tilføj Swagger-dekorationer (@ApiTags('<EntityName>'), @ApiOperation(), @ApiResponse(), etc.) for hvert endpoint.

Beskyt Endpoints (Authorization):

Opgave: Integrer AuthModule for at beskytte endpoints.

Handling:

Tilføj @UseGuards(JwtAuthGuard) til de controllere eller specifikke handlers, der kræver autentificering.

Implementer rollebaseret adgangskontrol hvis nødvendigt (f.eks. kun admins kan slette ord).

Opdater AppModule:

Opgave: Importer det nye <EntityModule> i apps/api/src/app.module.ts.

Testning (Backend):

Opgave: Skriv tests for de nye moduler.

Handling:

Unit tests for services (mock PrismaService).

Integrationstests (eller E2E tests) for controller endpoints ved hjælp af supertest og et test-NestJS-miljø. Test CRUD-operationer, inputvalidering og fejlhåndtering.

Verificering: Kør yarn workspace api test (eller tilsvarende).

Prioriteret Rækkefølge for Moduler:
Det kan være en god idé at starte med de mest grundlæggende eller mest brugte moduler. En mulig rækkefølge:

WordsModule

VersesModule

LessonsModule

QuizzesModule

Fase 2: Frontend-Backend Integration (Autentificering)
Mål: At forbinde frontendens login- og registreringssider til backendens AuthModule.

Opret API Service Lag i Frontend for Autentificering:

Opgave: Lav funktioner til at håndtere API-kald til backend.

Handling:

Opret en fil, f.eks. lib/auth-service.ts eller hooks/use-auth.ts.

Implementer funktioner som loginUser(credentials) og registerUser(userData).

Brug fetch eller axios til at lave POST-requests til /api/auth/login og /api/auth/register.

Håndter responses (succes og fejl). Ved succesfuld login, gem JWT-token (f.eks. i localStorage eller en state management løsning).

Husk at sætte Content-Type: application/json header.

Vigtigt: Definer base URL for API'en (f.eks. http://localhost:3000 under udvikling) i en miljøvariabel.

Opdater Login Side (app/auth/login/page.tsx):

Opgave: Erstat simuleret login med reelt API-kald.

Handling:

Importer og brug loginUser funktionen fra dit service lag.

I handleSubmit, kald loginUser med email og password.

Ved succes, naviger brugeren til dashboardet (f.eks. /).

Vis fejlbeskeder til brugeren ved login-fejl.

Opdater Registreringsside (app/auth/register/page.tsx):

Opgave: Erstat simuleret registrering med reelt API-kald.

Handling:

Importer og brug registerUser funktionen.

I handleSubmit, kald registerUser med brugerdata.

Ved succes, log brugeren ind (gem token) og naviger til dashboardet, eller vis en "registrering succesfuld" besked.

Vis fejlbeskeder (f.eks. "email allerede i brug").

Implementer Token Håndtering:

Opgave: Opsæt global håndtering af JWT-token for efterfølgende API-kald.

Handling:

Når en bruger logger ind, gem token.

For API-kald der kræver autentificering, inkluder token i Authorization headeren (f.eks. Bearer <token>). Dette kan centraliseres i dit API service lag.

Implementer logud-funktionalitet (fjern token og naviger til login).

Testning (Frontend & Integration):

Opgave: Test login og registrering grundigt.

Handling:

Test succesfulde flows.

Test fejlscenarier (forkert password, email eksisterer allerede).

Verificer at token gemmes og sendes korrekt.

Tjek at beskyttede backend-ruter kun kan tilgås med gyldigt token.

Fase 3: Frontend-Backend Integration (Kerne-Features)
Mål: At forbinde frontend-siderne med de nye backend API-endpoints for Word, Verse, Lesson, Quiz.

For hver relevant frontend-side/komponent der skal vise eller manipulere data fra en kerneentitet:

Opret/Opdater API Service Lag i Frontend:

Opgave: Tilføj funktioner til at interagere med de nye backend-endpoints.

Handling:

I dit API service lag (f.eks. lib/data-service.ts), opret funktioner som getWords(), getWordById(id), createWord(data), updateWord(id, data), deleteWord(id), etc.

Disse funktioner skal bruge fetch eller axios til at kalde de respektive backend-endpoints (f.eks. GET /api/words).

Husk at inkludere JWT-token for beskyttede endpoints.

Håndter responses og fejl.

Integrer i Frontend Komponenter:

Opgave: Opdater komponenter til at hente og vise data fra backend.

Handling:

Brug useEffect og useState (eller en state management løsning som Zustand/Redux) til at hente data når komponenten mounter.

Kald de relevante funktioner fra dit API service lag.

Erstat al mock-data med data fra backend.

Implementer loading states (vis f.eks. <Skeleton /> komponenter mens data hentes).

Implementer fejlhåndtering i UI (vis meningsfulde fejlbeskeder).

For sider der opretter/opdaterer data, forbind formularer til de tilsvarende API-kald.

Eksempler på Integrationer:

app/alphabet/page.tsx: Kan potentielt hente bogstavdata eller eksempler fra backend, hvis det udvides.

app/learn/vocabulary/page.tsx og app/vocabulary/flashcards/page.tsx: Skal hente ord (fra Word entiteten) fra /api/words.

app/grammar/page.tsx: Skal hente lektioner (fra Lesson entiteten) og grammatikregler fra /api/lessons eller en dedikeret /api/grammar-rules.

app/quran/study/[surahId]/page.tsx: Skal hente vers (fra Verse entiteten) og ordanalyse (fra Word entiteten relateret til vers) fra /api/verses og /api/words.

app/quran/advanced-study/page.tsx: De tre sektioner (TafsirSection, ComparativeStudySection, ThematicExplorationSection) skal opdateres til at hente deres respektive data fra nye backend-endpoints (f.eks. /api/tafsir, /api/themes).

app/practice/quiz/page.tsx og app/quiz-system/page.tsx: Skal hente quizzer og spørgsmål (fra Quiz og potentielt en Question entitet) fra /api/quizzes. Skal også kunne indsende svar.

Testning (Frontend & Integration):

Opgave: Test alle sider der interagerer med backend.

Handling:

Verificer at data hentes og vises korrekt.

Test oprettelse, opdatering og sletning af data.

Test loading states og fejlhåndtering.

Udfør end-to-end tests for de vigtigste brugerflows.

Fase 4: AI-Funktionalitet og Avancerede Features
Mål: At begynde implementering af AI-drevne features og andre avancerede funktioner, når kernefunktionaliteten er stabil.

Backend AI Integration:

Opgave: Design og implementer API-endpoints i backend, der kan håndtere AI-relaterede opgaver.

Handling:

Eksempel: POST /api/ai/pronunciation-feedback (modtager lydfil, returnerer feedback).

Eksempel: POST /api/ai/grammar-check (modtager tekst, returnerer grammatisk analyse).

Integrer med eventuelle eksterne AI-tjenester eller modeller.

Frontend AI Integration:

Opgave: Udvikl frontend-komponenter, der interagerer med AI-backend-endpoints.

Handling:

Opdater app/ai-feedback/page.tsx til at bruge de nye AI-endpoints i stedet for mock-data.

Komponenter som ai-explain-overlay.tsx og ai-insight-card.tsx kan fodres med data fra disse AI-endpoints.

Implementer Øvrige Features:

Opgave: Fortsæt med implementering af andre planlagte features som specificeret i PROJEKT_ANALYSE.md og api_udviklingsplan.md (f.eks. brugerprogression, community features).

Fase 5: Optimering, Sikkerhed og Deployment Forberedelse
Mål: At forbedre applikationens ydeevne, sikkerhed og forberede den til deployment.

Performance Optimering:

Frontend:

Brug Next.js' indbyggede optimeringer (code splitting, image optimization).

Analyser bundle sizes.

Implementer lazy loading for komponenter og billeder hvor relevant.

Optimer state management for at undgå unødvendige re-renders.

Backend:

Analyser og optimer Prisma-forespørgsler.

Overvej caching-strategier for ofte hentede data (f.eks. med Redis).

Database: Sørg for korrekte indekser på PostgreSQL-tabeller.

Sikkerhedsgennemgang:

Frontend: Beskyt mod XSS, CSRF. Håndter brugerinput sikkert.

Backend: Valider al input (DTOs, query params). Implementer rate limiting. Beskyt mod SQL injection (Prisma hjælper her). Gennemgå OWASP Top 10.

Sørg for sikker håndtering af JWT tokens (HTTPS, HttpOnly cookies hvis relevant).

PWA og Offline Funktionalitet:

Opgave: Gennemgå og test app/sw.ts og lib/offline-storage.ts.

Handling: Sørg for at caching-strategier er effektive og at offline-synkronisering virker som forventet. Test grundigt i offline-tilstand.

Grundig Testning:

Udfør regressionstestning.

Overvej brugeraccepttest (UAT).

Deployment Pipeline:

Opsæt CI/CD pipelines for automatiseret build, test og deployment af både frontend og backend.

Denne plan er omfattende, men ved at tage én fase og ét punkt ad gangen, kan du systematisk arbejde dig hen imod en fuldt integreret og funktionel applikation. Held og lykke!

