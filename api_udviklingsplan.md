# Flerfaset Udviklingsplan for Quranic Arabic Trainer API

> **Statusoversigt (maj 2024):**
>
> **Færdige moduler:**
> - WordsModule (CRUD, validering, Swagger, Prisma)
> - VerseModule (CRUD, validering, Swagger, Prisma)
> - LessonModule (CRUD, progression, Swagger, Prisma)
> - QuizModule (CRUD, quizlogik, scoring, Swagger, Prisma)
>
> **Mangler:**
> - UserModule (CRUD, profil, indstillinger)
> - FlashcardModule (CRUD, spaced repetition, statistik)
> - GrammarModule (CRUD, grammatiske regler, eksempler)
> - PronunciationModule (CRUD, lydfiler, feedback)
> - ProgressModule (CRUD, tracking, rapportering)
> - SettingsModule (CRUD, brugerpræferencer)
>
> **Frontend:**
> - Sider for flere moduler findes, men integration og UI/UX optimering mangler for nye features.
>
> **Test & Deployment:**
> - Testning påbegyndt, men ikke komplet. CI/CD og deployment mangler.
>
> **Dokumentation:**
> - Swagger delvist opsat. Øvrig dokumentation og vedligehold mangler.
>
> **Næste skridt (prioriteret):**
> 1. Implementér manglende backend-moduler (User, Flashcard, Grammar, Pronunciation, Progress, Settings)
> 2. Udvid frontend med sider og integration for de nye moduler
> 3. Implementér AI-feedback og adaptiv progression
> 4. Forbedr testdækning og optimer performance
> 5. Opsæt CI/CD og deployment
> 6. Færdiggør dokumentation og brugervejledninger

Dette dokument beskriver en detaljeret, flerfaset plan for udviklingen af REST API'en til Quranic Arabic Trainer platformen. Planen tager udgangspunkt i den specificerede monorepo-struktur med NestJS, Prisma og PostgreSQL.

**Vigtigt:** Konsulter altid `stackinfo.txt` og `guidelines.md` (hvis de findes i projektet) for specifikke konfigurationer og retningslinjer.

## Fase 1: Projektopsætning & Fundament

Mål: At etablere en solid base for API'en, inklusiv projektstruktur, databaseintegration og grundlæggende autentifikation.

1.  **Initialiser NestJS Projekt i `apps/api`:**
    *   Sæt NestJS op indenfor `apps/api` workspace.
    *   Konfigurer grundlæggende projektstruktur (modules, controllers, services).
2.  **Integrer Prisma & PostgreSQL:**
    *   Tilføj Prisma til NestJS-projektet.
    *   Definer forbindelsen til PostgreSQL-databasen.
    *   Opret den indledende `schema.prisma` fil.
3.  **Grundlæggende Konfiguration:**
    *   Opsæt håndtering af miljøvariabler (f.eks. med `@nestjs/config`).
    *   Implementer et robust logningssystem (f.eks. Winston eller NestJS's indbyggede Logger).
4.  **Definer Kerne-Entiteter/Modeller (Eksempler):**
    *   Begynd at definere de centrale datamodeller i `schema.prisma`. Dette kan inkludere:
        *   `User` (brugeroplysninger, roller)
        *   `Word` (arabiske ord, oversættelser, rod, etc.)
        *   `Verse` (Koranvers, surah-reference, tekst)
        *   `Lesson` (lektioner for forskellige emner)
        *   `Quiz` (quizzer, spørgsmål, svarmuligheder)
    *   Kør `npx prisma migrate dev --name init` for at oprette den første migration.
5.  **Implementer Grundlæggende Autentifikation & Autorisation:**
    *   Opsæt JWT (JSON Web Tokens) for brugerautentifikation.
    *   Implementer `AuthModule` med login- og registrerings-endpoints.
    *   Opsæt guards for at beskytte routes.
    *   Definer grundlæggende roller og tilladelser.

## Fase 2: Udvikling af Kerne-Feature Moduler

Mål: At implementere CRUD-funktionalitet og forretningslogik for de primære ressourcer i applikationen.

### Statusoversigt
- [x] WordsModule: CRUD, DTOs, validering, Swagger, Prisma integration (færdig)
  - Modul, controller, service, DTOs oprettet
  - CRUD-endpoints og validering implementeret
  - Swagger-dokumentation tilføjet
  - Prisma integration via PrismaService
- [x] VerseModule: CRUD, DTOs, validering, Swagger, Prisma integration (færdig)
  - Modul, controller, service, DTOs oprettet
  - CRUD-endpoints og validering implementeret
  - Swagger-dokumentation tilføjet
  - Prisma integration via PrismaService
  - **LessonModule (Færdig):**
    - Oprettelse af modul, controller, service, DTOs
    - Implementering af CRUD-endpoints i service og controller
    - Tilføjelse af Swagger-dokumentation til endpoints
    - Korrekt DTO-import og Prisma-integration
- **QuizModule (Færdig):**
    - Modul, controller, service oprettet (eksisterede delvist), DTOs oprettet
    - Implementering af CRUD-endpoints i service (eksisterede delvist)
    - Implementering af CRUD-endpoints i controller (opdateret)
    - Tilføjelse af Swagger-dokumentation til endpoints (opdateret)
    - Korrekt DTO-import og Prisma-integration (opdateret/bekræftet)
    - Tilføjet eksplicitte returtyper i service og controller
  - Implementer CRUD-endpoints og validering
  - Tilføj Swagger-dokumentation
  - Integrer med Prisma via PrismaService

For hver nøgleressource (f.eks. `users`, `words`, `verses`, `lessons`, `quizzes`, `flashcards`, `grammar-rules`, `alphabet-lessons`, `pronunciation-guides`, `progress`, `settings`):

1.  **Definer Prisma Schema for Ressource:**
    *   Tilføj/opdater modellen for ressourcen i `apps/api/prisma/schema.prisma`.
    *   Definer relationer til andre modeller.
    *   Kør `npx prisma migrate dev --name add-<resource>-model`.
    *   Kør `npx prisma generate` for at opdatere Prisma Client.
2.  **Opret NestJS Modul:**
    *   Generer et nyt modul: `nest g module modules/<resource>`.
    *   Struktur: `apps/api/src/modules/<resource>/`
3.  **Opret Data Transfer Objects (DTOs):**
    *   Opret DTOs for at validere indgående data:
        *   `apps/api/src/modules/<resource>/dtos/create-<resource>.dto.ts`
        *   `apps/api/src/modules/<resource>/dtos/update-<resource>.dto.ts`
        *   Brug `class-validator` og `class-transformer` for validering.
4.  **Opret Entitet (hvis nødvendigt udover Prisma-modellen):**
    *   Normalt vil Prisma-modellen fungere som entiteten. Hvis der er behov for yderligere logik eller transformationer, kan en separat entitetsfil overvejes:
        *   `apps/api/src/modules/<resource>/entities/<resource>.entity.ts`
5.  **Opret Service:**
    *   Generer en service: `nest g service modules/<resource>/services/<resource>` (juster sti efter behov).
    *   Implementer CRUD-operationer (Create, Read, Update, Delete) og anden forretningslogik for ressourcen.
    *   Interager med Prisma Client for databaseadgang.
    *   Fil: `apps/api/src/modules/<resource>/services/<resource>.service.ts`
6.  **Opret Controller:**
    *   Generer en controller: `nest g controller modules/<resource>/controllers/<resource>` (juster sti efter behov).
    *   Definer HTTP-endpoints (GET all, GET by id, POST, PUT, DELETE) med passende ruter (`/api/<resource>`).
    *   Brug DTOs til request body validering.
    *   Integrer Swagger-dekorationer (`@ApiTags('<ResourceName>')`, `@ApiOperation()`, `@ApiResponse()`, `@ApiBody()`, `@ApiParam()`).
    *   Fil: `apps/api/src/modules/<resource>/controllers/<resource>.controller.ts`
7.  **Opdater `AppModule`:**
    *   Importer det nye `<ResourceModule>` i `apps/api/src/app.module.ts`.
8.  **Skriv Tests:**
    *   Opret en testfil: `apps/api/test/<resource>.spec.ts`.
    *   Skriv unit tests for servicen og controlleren.
    *   Brug Jest og Supertest til integrationstests af endpoints.
9.  **Byg og Test Workspacet:**
    *   Kør `yarn workspace api build`.
    *   Kør `yarn workspace api test`.

## Fase 3: Avancerede Features & AI Integration

Mål: At implementere mere kompleks funktionalitet og integrere AI-drevne features.

1.  **Brugerprogression og Sporing:**
    *   Design og implementer systemer til at spore brugerens fremskridt gennem lektioner, quizzer, etc.
    *   Gem data relateret til gennemførte øvelser, score, og mestringsniveauer.
2.  **Quiz Generering og Scoring:**
    *   Udvikl logik for dynamisk generering af quizzer baseret på brugerens niveau og tidligere præstationer.
    *   Implementer avanceret scoring og feedback-mekanismer.
3.  **AI Integration (Eksempler):**
    *   **Feedback på Udtale:** Integrer med en service (eller et custom model) for at analysere brugerens udtale og give feedback.
    *   **Grammatisk Analyse:** Udvikl eller integrer værktøjer til at give feedback på grammatiske øvelser.
    *   **Personaliserede Læringsstier:** Brug AI til at foreslå næste skridt i læringsforløbet baseret på brugerdata.
    *   Overvej oprettelse af et dedikeret `AIModule`.
4.  **Community Features (hvis relevant):**
    *   Implementer funktionalitet for brugerinteraktion, f.eks. fora, deling af fremskridt, studiegrupper.
5.  **Admin Panel Funktionaliteter:**
    *   Udvikl endpoints til administration af brugere, indhold, quizzer, etc.
    *   Implementer dashboards for at overvåge systemets brug og performance.

## Fase 4: Frontend Integration

Mål: At sikre problemfri kommunikation mellem Next.js frontend (`apps/web`) og NestJS backend (`apps/api`).

1.  **Definer API Kontrakter/Typer:**
    *   Overvej at bruge et værktøj som OpenAPI generator eller dele TypeScript-typer mellem frontend og backend for at sikre konsistens.
2.  **Implementer API Kald fra Frontend:**
    *   Brug f.eks. `fetch` eller et bibliotek som `axios` eller `SWR`/`React Query` i Next.js applikationen til at interagere med API-endpoints.
3.  **Håndter Autentifikation og Autorisation på Frontend:**
    *   Implementer login/logout flow.
    *   Gem og håndter JWT tokens sikkert.
    *   Beskyt frontend-ruter og vis/skjul UI-elementer baseret på brugerens rolle og tilladelser.
4.  **Opdater UI Komponenter:**
    *   Forbind UI-komponenter til de nye backend-data.
    *   Implementer loading states, error handling, og data-display.

## Fase 5: Testning, Optimering & Deployment

Mål: At sikre API'ens kvalitet, performance og sikkerhed, samt forberede til produktion.

1.  **Omfattende End-to-End Testning:**
    *   Skriv E2E tests der simulerer reelle brugerflows gennem både frontend og backend.
2.  **Performance Optimering:**
    *   Analyser og optimer databaseforespørgsler (Prisma query optimization).
    *   Implementer caching-strategier (f.eks. med Redis) hvor relevant.
    *   Load test API'en for at identificere flaskehalse.
3.  **Sikkerhedsgennemgang og Hærdning:**
    *   Gennemgå for almindelige sårbarheder (OWASP Top 10).
    *   Implementer rate limiting, input sanitisering, og andre sikkerhedsforanstaltninger.
    *   Sørg for korrekt håndtering af følsomme data.
4.  **Opsæt CI/CD Pipelines:**
    *   Automatiser build, test, og deployment processer (f.eks. med GitHub Actions, GitLab CI, Jenkins).
5.  **Deployment:**
    *   Vælg en hosting platform (f.eks. Vercel for Next.js, Heroku/AWS/Google Cloud for NestJS API og PostgreSQL).
    *   Konfigurer produktionsmiljøer.
6.  **Monitorering og Logging i Produktion:**
    *   Opsæt værktøjer til at overvåge API'ens performance, oppetid og fejl (f.eks. Sentry, New Relic, Datadog).

## Fase 6: Dokumentation & Vedligeholdelse

Mål: At sikre langsigtet succes og vedligeholdelse af API'en.

1.  **Finaliser API Dokumentation:**
    *   Sørg for at Swagger/OpenAPI dokumentationen er komplet og opdateret.
    *   Generer eventuelt en statisk HTML-version af dokumentationen.
2.  **Opret Bruger- og Udviklerdokumentation:**
    *   Skriv guides til hvordan API'en bruges (for frontend-udviklere eller tredjeparter).
    *   Dokumenter arkitektur, designvalg, og komplekse dele af koden.
3.  **Etabler Vedligeholdelsesplan:**
    *   Planlæg regelmæssige opdateringer af afhængigheder.
    *   Definer en proces for håndtering af fejlrapporter og feature requests.

Denne plan er et levende dokument og kan justeres undervejs som projektet skrider frem og nye indsigter opnås.