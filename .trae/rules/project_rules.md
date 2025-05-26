Project Rules for Quranic Arabic Trainer
1. Generelle Principper
- Altid følg teknologistakken defineret i `stackinfo.txt`:
- Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui.
- Backend: NestJS, TypeScript, Prisma (med PostgreSQL som mål, pt. SQLite).
- Skriv ren, læselig og velorganiseret kode med meningsfulde navne.
- Følg DRY og KISS principperne.
- Brug kommentarer til kompleks logik; stræb efter selvforklarende kode.

2. TypeScript Best Practices
- Udnyt TypeScripts statiske typetjek fuldt ud. **Undgå `any` hvor det er muligt.** 
- Brug interfaces og typer til datastrukturer og kontrakter.

3. Sikkerhed
- Følg OWASP Top 10. [cite: 13]
- Valider og sanitiser al brugerinput (specielt i backend DTOs)
- Håndter følsomme data forsvarligt. Undgå hardkodede secrets.

4. Testning
- Skriv unit tests for kritiske funktioner og komponenter.
- Skriv integrationstests for API endpoints og for at sikre samspil mellem systemdele.
- **Testkrav for backend-moduler: Kritiske moduler skal sigte mod ≥ 80 % dækningsgrad.**

5. Frontend Specifik (`app/`, `components/`)
- Organiser komponenter logisk. Genbrug `shadcn/ui` komponenter.
- Følg etablerede stil- og designprincipper fra `shadcn/ui`.

6.  Backend Specifik (`apps/api/`)
- Organiser koden i moduler baseret på features/domæner.
- Brug DTOs med `class-validator` til validering af request/response payloads. [cite: 13]
- Dokumenter alle API endpoints med Swagger-dekorationer.

7. **Versionering:** Versionér denne fil sammen med koden (commit den til Git)
8.  **Synkronisering:** Sørg for at `guidelines.md` og `project_rules.md` holdes synkroniserede
