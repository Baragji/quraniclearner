# Quranic Arabic Trainer - Udviklingsretningslinjer

Dette dokument indeholder generelle retningslinjer for udviklingen af Quranic Arabic Trainer platformen. Formålet er at sikre konsistens, kvalitet og vedligeholdelsesvenlig kode på tværs af hele projektet.

## Generelle Principper

1.  **Følg Teknologistakken:** Overhold altid den specificerede teknologistak som defineret i `stackinfo.txt`.
    *   Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui.
    *   Backend: NestJS, TypeScript, Prisma, PostgreSQL.
2.  **Kodekvalitet:**
    *   Skriv ren, læselig og velorganiseret kode.
    *   Anvend meningsfulde navne til variable, funktioner, klasser, etc.
    *   Følg principper som DRY (Don't Repeat Yourself) og KISS (Keep It Simple, Stupid).
    *   Brug kommentarer hvor det er nødvendigt for at forklare kompleks logik, men stræb efter selvforklarende kode.
3.  **TypeScript Best Practices:**
    *   Udnyt TypeScripts statiske typetjek fuldt ud. Undgå `any` hvor det er muligt.
    *   Brug interfaces og typer til at definere datastrukturer og kontrakter.
    *   Følg de officielle TypeScript retningslinjer.
4.  **Fejlhåndtering:**
    *   Implementer robust fejlhåndtering både i frontend og backend.
    *   Giv brugeren meningsfulde fejlbeskeder.
    *   Log fejl detaljeret for nemmere debugging.
5.  **Sikkerhed:**
    *   Vær opmærksom på sikkerhedsaspekter i alle udviklingsfaser.
    *   Følg OWASP Top 10 og andre relevante sikkerhedsbestemmelser.
    *   Valider og sanitiser al brugerinput.
    *   Håndter følsomme data (f.eks. brugeroplysninger, API-nøgler) forsvarligt. Undgå at hardcode secrets.
6.  **Performance:**
    *   Skriv performant kode og vær opmærksom på potentielle flaskehalse.
    *   Optimer databaseforespørgsler.
    *   Brug caching-strategier hvor det er relevant.
    *   For frontend: Optimer billeder, brug code splitting, lazy loading, etc.
7.  **Testning:**
    *   Skriv unit tests for kritiske funktioner og komponenter.
    *   Skriv integrationstests for at sikre, at forskellige dele af systemet fungerer korrekt sammen.
    *   For backend: Test API endpoints grundigt (f.eks. med Jest/Supertest).
    *   Stræb efter en fornuftig testdækning.
8.  **Versionering (Git):**
    *   Brug Git til versionskontrol.
    *   Skriv klare og informative commit-beskeder.
    *   Brug feature branches for ny udvikling og fejlrettelser.
    *   Overvej en Git branching model (f.eks. GitFlow eller GitHub Flow).
9.  **Dokumentation:**
    *   Dokumenter API endpoints (f.eks. med Swagger for backend).
    *   Dokumenter komplekse funktioner eller arkitekturbeslutninger.
    *   Hold `README.md` og andre projektrelaterede dokumenter opdaterede.

## Frontend Specifikke Retningslinjer (`/apps/web`)

1.  **Komponentstruktur:**
    *   Organiser komponenter logisk, f.eks. efter feature eller type.
    *   Genbrug eksisterende `shadcn/ui` komponenter hvor det er muligt.
    *   Byg nye UI-komponenter med genbrugelighed for øje.
2.  **State Management:**
    *   Vælg en passende state management løsning (f.eks. React Context, Zustand, Redux Toolkit) baseret på applikationens kompleksitet.
    *   Hold komponent-state lokal hvor det er muligt.
3.  **Styling (Tailwind CSS & shadcn/ui):**
    *   Følg den etablerede stil og designprincipper fra `shadcn/ui`.
    *   Brug Tailwind CSS utility classes for styling.
    *   Undgå custom CSS medmindre det er absolut nødvendigt og velbegrundet.
4.  **PWA & Offline Funktionalitet:**
    *   Vær opmærksom på PWA-krav og offline-kapabiliteter under udvikling.
    *   Test offline funktionalitet grundigt.
5.  **Tilgængelighed (a11y):**
    *   Sørg for at UI-komponenter og layouts er tilgængelige for brugere med handicap (følg WCAG retningslinjer).

## Backend Specifikke Retningslinjer (`/apps/api`)

1.  **NestJS Modulær Arkitektur:**
    *   Organiser koden i moduler baseret på features eller domæner.
    *   Følg NestJS's anbefalede projektstruktur.
2.  **Prisma & Database:**
    *   Definer klare og velstrukturerede Prisma-modeller.
    *   Brug Prisma Client effektivt og undgå N+1 problemer.
    *   Skriv migrationer omhyggeligt og test dem.
3.  **API Design (RESTful):**
    *   Design API endpoints så de er intuitive og følger RESTful principper.
    *   Brug korrekte HTTP-metoder (GET, POST, PUT, DELETE, PATCH).
    *   Brug meningsfulde HTTP statuskoder.
    *   Implementer paginering, filtrering og sortering for liste-endpoints.
4.  **DTOs (Data Transfer Objects):**
    *   Brug DTOs med `class-validator` og `class-transformer` til at validere og transformere request/response payloads.
5.  **Swagger/OpenAPI Dokumentation:**
    *   Dokumenter alle API endpoints grundigt med Swagger-dekorationer (`@ApiTags`, `@ApiOperation`, `@ApiResponse`, etc.).

## Samarbejde & Kommunikation

1.  **Værktøjer:**
    *   Brug Trae AI som den primære udviklingsassistent.
    *   Brug de specificerede værktøjer til filhåndtering, terminalkommandoer, web search, etc.
2.  **Kommunikation:**
    *   Kommuniker klart omkring foreslåede ændringer, udfordringer og fremskridt.
    *   Vær proaktiv og løsningsorienteret.

Disse retningslinjer er dynamiske og kan opdateres efter behov. Det er alles ansvar at kende og følge dem.