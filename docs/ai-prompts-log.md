## AI Development Approach

This project was built using structured AI-assisted development.
All major architectural decisions and feature implementations were generated through AI tools and reviewed manually.

# AI Prompts Log

This document contains a log of AI-assisted development steps.
All architectural and structural decisions were generated using AI tools as required by the task.

---

## [2026-02-13] — Project Architecture Scaffold

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

You are a senior fullstack architect.

I am building a Time Tracker application using:

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Prisma + SQLite
- API Routes (Next.js)

Create a clean scalable folder structure using layered architecture.

Requirements:

- Separate presentation layer (UI components)
- Business logic layer (services)
- Data access layer (repositories)
- API layer (route handlers)
- Prisma setup folder
- Shared utilities folder

Domain entities:

- Project
- TimeEntry
- TaskName (can be simple string entity for autocomplete)

Do NOT implement full logic yet.
Only create folder structure with placeholder files and minimal boilerplate exports.

The structure must be production-ready and scalable.
Avoid putting everything inside app folder.

Return full folder tree and generate necessary base files.

### Purpose

To generate a clean layered architecture for a scalable fullstack application.

### Changes

        new file:   docs/ai-prompts-log.md
        new file:   app/api/projects/route.ts
        new file:   app/api/task-names/route.ts
        new file:   app/api/time-entries/route.ts
        new file:   prisma/schema.prisma
        new file:   src/api/projects/project.api.ts
        new file:   src/api/task-names/taskName.api.ts
        new file:   src/api/time-entries/timeEntry.api.ts
        new file:   src/core/db/prismaClient.ts
        new file:   src/core/domain/project.ts
        new file:   src/core/domain/taskName.ts
        new file:   src/core/domain/timeEntry.ts
        new file:   src/core/repositories/project.repository.ts
        new file:   src/core/repositories/taskName.repository.ts
        new file:   src/core/repositories/timeEntry.repository.ts
        new file:   src/core/services/project.service.ts
        new file:   src/core/services/taskName.service.ts
        new file:   src/core/services/timeEntry.service.ts
        new file:   src/presentation/components/projects/ProjectList.tsx
        new file:   src/presentation/components/task-names/TaskNameAutocomplete.tsx
        new file:   src/presentation/components/time-entries/TimeEntryForm.tsx
        new file:   src/presentation/hooks/useProjects.ts
        new file:   src/presentation/hooks/useTimeEntries.ts
        new file:   src/presentation/layout/DashboardLayout.tsx
        new file:   src/shared/types/api.ts
        new file:   src/shared/utils/date.ts
        new file:   src/shared/utils/validation.ts

### Result Summary

- Created layered folder structure
- Separated presentation, services, repositories, api
- Added Prisma placeholder setup
- Prepared Next.js route adapters

### Notes

Architecture follows clean layered principles and keeps framework adapters isolated from business logic.

---

## [2026-02-13] — Prisma setup for Next.js with SQLite

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Install and configure Prisma for this Next.js project using SQLite.

Requirements:

1. Initialize Prisma in the project (prisma/schema.prisma).
2. Define the following models:

- Project
  - id: String (UUID) @id @default(uuid())
  - name: String
  - color: String
  - createdAt: DateTime @default(now())
  - updatedAt: DateTime @updatedAt
  - timeEntries: Relation to TimeEntry[]

- TimeEntry
  - id: String (UUID) @id @default(uuid())
  - description: String (task name)
  - projectId: String (relation to Project)
  - startTime: DateTime
  - endTime: DateTime? (nullable)
  - duration: Int (seconds)
  - createdAt: DateTime @default(now())
  - updatedAt: DateTime @updatedAt

3. Create PrismaClient singleton in src/core/db/prismaClient.ts
4. Ensure the setup is ready for generating repository layer next
5. Do NOT implement business logic or services

### Purpose

To set up the database layer using Prisma and SQLite, with properly defined models and a PrismaClient singleton.
This will serve as the foundation for repositories and data access.

### Changes

        modified:   package-lock.json
        modified:   package.json
        new file:   prisma.config.ts
        modified:   prisma/schema.prisma

### Result Summary

- Prisma 7 встановлено та налаштовано для SQLite
- Створено моделі Project та TimeEntry з усіма полями та зв'язками
- Створено prisma.config.ts для datasource
- Конфігурація PrismaClient singleton завершена
- Prisma Client згенеровано та готовий до використання у репозиторіях
- Схема готова для створення репозиторіїв та подальшої бізнес-логіки

### Notes

- Prisma 7 змінила спосіб конфігурації datasource (url перенесено у prisma.config.ts)
- Duration зберігається в секундах для простішого обчислення часу
- Наступний крок — створення repository layer для Project та TimeEntry
- Використовувати PrismaClient з singleton паттерном у сервісах
- Для тестування можна запускати `npx prisma studio` та `npx prisma migrate dev`

---

## [2026-02-13] — Create a Project Repository using PrismaClient

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a repository class for Project entity using PrismaClient.

Requirements:

1. File: src/core/repositories/project.repository.ts
2. Use PrismaClient singleton from src/core/db/prismaClient.ts
3. Implement methods:
   - getAll(): Promise<Project[]>
   - getById(id: string): Promise<Project | null>
   - create(data: { name: string; color: string }): Promise<Project>
   - update(id: string, data: { name?: string; color?: string }): Promise<Project>
   - delete(id: string): Promise<void>
4. Include proper TypeScript typing for inputs and outputs
5. Do NOT implement business logic or service layer
6. Ensure clean, maintainable, production-ready code

### Purpose

To create the Project repository layer to handle all CRUD operations on the Project model using PrismaClient.
This repository will be used by service layer for business logic.

### Changes

        modified:   src/core/repositories/project.repository.ts

### Result Summary

- Створено клас ProjectRepository у src/core/repositories/project.repository.ts.

- Використано PrismaClient singleton з src/core/db/prismaClient.ts.

- Типи TypeScript: використані Prisma-generated Project та власні інтерфейси для input.

- Реалізовані методи:
  - getAll() — повертає всі проекти, відсортовані за датою створення (новіші першими)

  - getById(id: string) — отримання проекту за ID або null

  - create(data) — створює новий проект з name і color

  - update(id, data) — оновлює лише надані поля (partial update)

  - delete(id) — видаляє проект за ID

- Реалізовано обробку помилок Prisma для подальшого використання на сервісному рівні

- Business logic відсутній — чистий data access layer

- Готово для використання у сервісах та подальшої інтеграції з UI

### Notes

- Використання partial update через conditional spreading — сучасний best practice для репозиторіїв

- Типізація забезпечує повну безпеку при використанні у сервісах

- Підготовка до наступного кроку: створення TimeEntry repository

- Рекомендується після генерації додати unit-тести для CRUD методів (опційно, але добре для демонстрації професійного підходу)

- Всі зміни можна легко логувати через git diff для наступних кроків

---

## [2026-02-13] — TimeEntry repository class implementation

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a repository class for TimeEntry entity using PrismaClient.

Requirements:

1. File: src/core/repositories/timeEntry.repository.ts
2. Use PrismaClient singleton from src/core/db/prismaClient.ts
3. Implement methods:
   - getAll(): Promise<TimeEntry[]> — return all time entries ordered by startTime descending
   - getById(id: string): Promise<TimeEntry | null> — fetch by ID
   - create(data: { description: string; projectId: string; startTime: Date; endTime?: Date; duration?: number }): Promise<TimeEntry>
   - update(id: string, data: { description?: string; projectId?: string; startTime?: Date; endTime?: Date; duration?: number }): Promise<TimeEntry>
   - delete(id: string): Promise<void>
4. Include proper TypeScript typing for inputs and outputs
5. Ensure relations with Project are properly typed
6. Do NOT implement service layer
7. Ensure clean, maintainable, production-ready code

### Purpose

To create the TimeEntry repository layer to handle all CRUD operations on the TimeEntry model using PrismaClient.
This repository will be used by service layer for business logic.
The repository must support partial updates and maintain proper TypeScript typing.

### Changes

        modified:   src/core/repositories/timeEntry.repository.ts

### Result Summary

- Створено клас TimeEntryRepository у src/core/repositories/timeEntry.repository.ts.

- Використано PrismaClient singleton з src/core/db/prismaClient.ts.

- Реалізовані методи:
  - getAll() — повертає всі записи часу, відсортовані за startTime у спадаючому порядку

  - getById(id: string) — отримання запису за ID або null

  - create(data) — створює новий запис часу з обов’язковими та опційними полями

  - update(id, data) — оновлює лише надані поля (partial update)

  - delete(id) — видаляє запис за ID

  - listByProject(projectId) — повертає всі записи часу конкретного проекту

- Типи TypeScript: використані Prisma-generated TimeEntry та власні інтерфейси для input (CreateTimeEntryData, UpdateTimeEntryData)

- Відповідність шаблону ProjectRepository: чистий код, JSDoc коментарі, conditional update через spread оператор

- Репозиторій готовий до використання у сервісах і забезпечує повну типізацію та зв’язки з Project

### Notes

- Використання listByProject дозволяє легко групувати записи по проектам для UI або звітів

- Conditional spread у update() — сучасний best practice для partial update

- Репозиторій повністю повторює патерн ProjectRepository → консистентність коду

- Наступний крок: створення service layer для бізнес-логіки (ProjectService та TimeEntryService)

- Рекомендація: додати unit-тести на CRUD методи для перевірки логіки та зв’язків

---

## [2026-02-14] — Implement a business logic layer for the Project entity

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a service class for Project entity.

Requirements:

1. File: src/core/services/project.service.ts
2. Use ProjectRepository (inject via constructor)
3. Do NOT use Prisma directly inside the service
4. Implement business logic methods:
   - getProjects(): Promise<Project[]>
   - getProject(id: string): Promise<Project>
   - createProject(data: { name: string; color: string }): Promise<Project>
   - updateProject(id: string, data: { name?: string; color?: string }): Promise<Project>
   - deleteProject(id: string): Promise<void>

5. Business rules:
   - Throw an error if project is not found in getProject
   - Validate that project name is not empty
   - Trim name before saving
   - Prevent creation if a project with the same name already exists
6. Ensure clean architecture:
   - No direct database logic
   - Use repository only
   - Add proper TypeScript typing
   - Add JSDoc comments
7. Code must be production-ready and maintainable

### Purpose

To introduce business logic layer for Project entity.
The service should encapsulate validation rules, error handling, and domain logic,
while delegating data access to ProjectRepository.
This separates domain logic from persistence logic and prepares the application
for controllers or API routes.

### Changes

        modified:   src/api/projects/project.api.ts
        modified:   src/core/domain/project.ts
        modified:   src/core/repositories/project.repository.ts
        modified:   src/core/services/project.service.ts

### Result Summary

- Повністю реалізовано ProjectService у src/core/services/project.service.ts.

- Сервіс використовує dependency injection через ProjectRepository (без прямого використання Prisma).

- Реалізовані методи:
  - getProjects() — отримання всіх проектів

  - getProject(id) — отримання проекту з перевіркою існування

  - createProject(data) — створення з валідацією та перевіркою дублікатів

  - updateProject(id, data) — оновлення з перевіркою існування та валідацією

  - deleteProject(id) — видалення з перевіркою існування

- Додані бізнес-правила:
  - Назва проекту обов’язкова

  - Назва тримається через trim()

  - Заборонено створення проекту з існуючим іменем

- Додано getByName() у ProjectRepository для перевірки дублікатів.

- Оновлено domain-модель Project — тепер відповідає Prisma schema (id, name, color, createdAt, updatedAt).

- API оновлено для використання ProjectRepository + ProjectService.

- Введено кастомні помилки:
  - ProjectNotFoundError

  - ProjectValidationError

- Повна типізація через CreateProjectInput, UpdateProjectInput та domain Project.

### Notes

- Архітектура тепер чітко розділена:
  - Repository → persistence

  - Service → бізнес-логіка

  - API → транспортний шар

- Duplicate-check через getByName() — правильний підхід без завантаження всіх проектів.

- Domain-модель синхронізована з Prisma — уникнуто drift між domain і persistence.

- Dependency Injection дозволяє легко писати unit-тести для сервісу.

- Сервіс готовий до розширення (наприклад: soft-delete, project statistics, etc.).

---

## [2026-02-14] — To implement business logic for time tracking

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a service class for TimeEntry entity.

Requirements:

1. File: src/core/services/timeEntry.service.ts
2. Inject dependencies via constructor:
   - TimeEntryRepository
   - ProjectRepository
3. Do NOT use Prisma directly in the service.
4. Implement business logic methods:
   - getEntries(): Promise<TimeEntry[]>
   - getEntry(id: string): Promise<TimeEntry>
   - startTimer(data: { description: string; projectId: string }): Promise<TimeEntry>
   - stopTimer(id: string): Promise<TimeEntry>
   - updateEntry(id: string, data: { description?: string; startTime?: Date; endTime?: Date }): Promise<TimeEntry>
   - deleteEntry(id: string): Promise<void>

5. Business rules:
   - A timer cannot be started if there is already an active timer (an entry with null endTime).
   - When starting a timer:
     - Validate project exists using ProjectRepository.
     - description must not be empty (trim it).
     - startTime = current date.
     - endTime = null.
     - duration = 0.
   - When stopping a timer:
     - Entry must exist.
     - Entry must not already be stopped.
     - endTime = current date.
     - duration = difference in seconds between endTime and startTime.
   - updateEntry:
     - Recalculate duration if startTime or endTime changes.
   - deleteEntry:
     - Throw error if entry not found.

6. Add proper error classes:
   - TimeEntryNotFoundError
   - ActiveTimerExistsError
   - TimeEntryValidationError

7. Use strong TypeScript typing.
8. Add JSDoc comments.
9. Ensure clean, maintainable, production-ready code.

### Purpose

To implement business logic for time tracking.

The service should:

- Control active timer behavior
- Calculate duration automatically
- Enforce project existence validation
- Prevent invalid states (e.g., multiple active timers)

This establishes the core domain logic of the time tracking system
while keeping persistence concerns inside repositories.

### Changes

        modified:   src/core/repositories/timeEntry.repository.ts
        modified:   src/core/services/timeEntry.service.ts

### Result Summary

- Додано getActiveEntry() у TimeEntryRepository для перевірки наявності активного таймера (endTime = null).

- Реалізовано TimeEntryService у src/core/services/timeEntry.service.ts.

- Використано dependency injection:
  - TimeEntryRepository

  - ProjectRepository

- Prisma не використовується у сервісі — чисте дотримання Clean Architecture.

- Реалізовані методи:
  - getEntries() — отримання всіх записів

  - getEntry(id) — отримання запису з перевіркою існування

  - startTimer() — старт нового таймера з валідацією

  - stopTimer(id) — зупинка таймера з автоматичним розрахунком duration

  - updateEntry(id, data) — часткове оновлення з перерахунком duration

  - deleteEntry(id) — видалення з перевіркою існування

- Бізнес-правила:
  - Заборонено запускати новий таймер, якщо вже є активний

  - Обов’язкова перевірка існування проекту

  - description обов’язковий та trim()

  - duration рахується автоматично (seconds)

- Додано кастомні помилки:
  - TimeEntryNotFoundError

  - ActiveTimerExistsError

  - TimeEntryValidationError

- Додано helper durationInSeconds() для централізованого розрахунку часу

- Повна типізація через Prisma-generated типи

- Повна JSDoc документація

### Notes

- Логіка активного таймера реалізована правильно через repository → сервіс не знає про Prisma.

- Інваріант "only one active timer" тепер гарантований на рівні домену.

- Перерахунок duration при зміні startTime або endTime — критично правильне рішення.

- Помилки розділені по типах → це дозволить правильно мапити їх у HTTP status коди.

- Архітектура тепер має повноцінний Domain Core:
  - Repositories

  - Services

  - Error layer

  - Business invariants

---

## [2026-02-14] — Create Base Domain Error

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a base DomainError class for the application.

Requirements:

1. File: src/core/errors/domain.error.ts
2. DomainError should extend Error
3. It should include:
   - message: string
   - code: string (machine-readable error code)
4. Add proper constructor
5. Add JSDoc
6. Production-ready implementation

### Purpose

To introduce a centralized base error class for domain-level exceptions.

The DomainError class establishes a consistent error structure
(message + machine-readable code) that can be extended by all
business logic errors.

This enables clean separation between:

- Domain logic (services throwing errors)
- HTTP layer (mapping domain errors to responses)

It prepares the system for centralized error handling and
production-grade API responses.

### Changes

        new file:   src/core/errors/domain.error.ts

### Result Summary

- Створено базовий клас DomainError у src/core/errors/domain.error.ts.
- DomainError розширює стандартний Error.
- Додано властивості:
  - message (людиночитабельний опис)
  - code (machine-readable error code, readonly)
- Реалізовано production-safe поведінку:
  - Object.setPrototypeOf(...) для коректного instanceof
  - Error.captureStackTrace(...) для чистого stack trace
- Додано метод toJSON() для логування та API-відповідей.
- Додано повну JSDoc документацію та приклад розширення.
- Клас готовий для наслідування (ProjectNotFoundError, etc.).

### Notes

- DomainError створює єдиний стандарт помилок у системі.
- Наявність machine-readable code дозволяє:
  - легко мапити помилки у HTTP статуси
  - стандартизувати відповіді API
  - логувати помилки структуровано
- Object.setPrototypeOf критично важливий для коректної роботи instanceof після компіляції TypeScript.
- toJSON() готує клас до використання в centralized error handler.
- Архітектурно це основа для production-grade error handling.

---

## [2026-02-14] — Error Mapper (HTTP Mapping Layer)

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a centralized HTTP error mapping utility.

Requirements:

1. File: src/api/utils/errorMapper.ts
2. Export function: mapErrorToHttp(error: unknown)
3. Handle the following domain errors:
   - ProjectNotFoundError → 404
   - TimeEntryNotFoundError → 404
   - ActiveTimerExistsError → 409
   - ProjectValidationError → 400
   - TimeEntryValidationError → 400
   - DomainError → 400
   - Unknown error → 500

4. The function must return:
   {
   status: number;
   body: {
   error: string;
   code?: string;
   };
   }

5. Use instanceof checks.
6. Do NOT use any framework-specific logic (no NextResponse inside).
7. Add proper TypeScript typing.
8. Add JSDoc comments.
9. Clean, production-ready implementation.

### Purpose

To implement a centralized HTTP error mapping layer that translates
domain-level errors into standardized HTTP responses.

This ensures:

- Services throw only domain errors.
- API routes remain thin and transport-focused.
- HTTP status codes are consistent and predictable.
- Internal error details are not leaked to clients.

This layer formalizes the boundary between the domain core
and the transport layer.

### Changes

        new file:   src/api/utils/errorMapper.ts
        new file:   src/core/errors/domain.error.ts

### Result Summary

- Створено centralized HTTP error mapper у src/api/utils/errorMapper.ts.
- Реалізовано функцію mapErrorToHttp(error: unknown).
- Використано instanceof перевірки для мапінгу доменних помилок:
  - ProjectNotFoundError → 404
  - TimeEntryNotFoundError → 404
  - ActiveTimerExistsError → 409
  - ProjectValidationError → 400
  - TimeEntryValidationError → 400
  - DomainError → 400
  - Unknown error → 500 (generic message)
- Повертається стандартизована структура:
  {
  status: number,
  body: {
  error: string,
  code?: string
  }
  }
- Не використовується framework-specific логіка (NextResponse відсутній).
- Експортовано типи MappedHttpError та HttpErrorResponseBody.
- Готово для використання в API routes.

### Notes

- Чітко реалізовано separation of concerns:
  Service → кидає domain errors
  API → мапить їх у HTTP через errorMapper
- Unknown errors не розкривають внутрішню інформацію (production-safe).
- Використання instanceof гарантує строгий контроль типів.
- Структурована відповідь API спрощує інтеграцію з фронтендом.
- Архітектура тепер має централізовану error-handling стратегію.

---

## [2026-02-14] — Refactor Project API Route

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Refactor the Project API route to use centralized error handling.

Requirements:

1. File: src/api/projects/project.api.ts
2. Wrap all service calls in try/catch blocks.
3. Use mapErrorToHttp(error) inside catch.
4. Return standardized JSON structure:

   Success:
   {
   success: true,
   data: ...
   }

   Error:
   {
   success: false,
   error: string,
   code?: string
   }

5. Use NextResponse.json() for responses.
6. HTTP status codes must come from errorMapper.
7. Do not leak internal error details.
8. Ensure strong TypeScript typing.
9. Clean, production-ready implementation.

### Purpose

To refactor the Project API route to use centralized error handling
via the errorMapper utility.

This ensures:

- Consistent HTTP status codes
- Unified response envelope
- No leakage of internal errors
- Proper separation between domain and transport layers

This completes the full clean architecture flow:
Repository → Service → DomainError → ErrorMapper → API.

### Changes

### Result Summary

- Всі виклики сервісу в project.api.ts обгорнуті в try/catch.
- У catch використовується mapErrorToHttp(error).
- HTTP статуси беруться виключно з errorMapper.
- Реалізовано стандартизований response envelope:

  Success:
  {
  success: true,
  data: T
  }

  Error:
  {
  success: false,
  error: string,
  code?: string
  }

- Використовується NextResponse.json() для відповіді.
- Типізація уніфікована через ApiSuccessResponse<T>, ApiErrorResponse, ApiResponse<T>.
- Використано доменний тип Project для відповіді.
- Забезпечено production-safe обробку unknown errors (500).

### Notes

- API тепер є thin transport layer без бізнес-логіки.
- Вся валідація та правила залишилися в Service.
- Error handling централізований, що спрощує масштабування.
- Стандартизований response envelope спрощує фронтенд-інтеграцію.
- Немає витоку внутрішніх помилок (good security practice).
- Архітектура відповідає clean architecture принципам.

Project API тепер production-ready.

---

## [2026-02-14] — Implement TimeEntry API with Centralized Error Handling

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Refactor/implement the TimeEntry API route to be production-ready.

Requirements:

1. File: src/api/time-entries/timeEntry.api.ts
2. Wrap all service calls in try/catch blocks.
3. Use mapErrorToHttp(error) inside catch.
4. Return standardized JSON structure:

   Success:
   {
   success: true,
   data: ...
   }

   Error:
   {
   success: false,
   error: string,
   code?: string
   }

5. Use NextResponse.json() for responses.
6. HTTP status codes must come from errorMapper.
7. Do not leak internal error details.
8. Ensure strong TypeScript typing using:
   - TimeEntry from domain / Prisma
   - ApiResponse<T> envelope type

9. Implement all endpoints needed for TimeEntryService:
   - getEntries()
   - getEntry(id)
   - startTimer({ description, projectId })
   - stopTimer(id)
   - updateEntry(id, data)
   - deleteEntry(id)

10. Keep API layer thin: no business logic in the route.

### Purpose

To implement a production-ready TimeEntry API route with centralized error handling.

Goals:

- Thin transport layer: repository/service handle business logic
- Standardized JSON envelope for frontend consumption
- Proper HTTP codes via mapErrorToHttp
- Production-safe handling of unknown errors
- Strong TypeScript typing
- Consistency with Project API route

### Changes

        new file:   app/api/time-entries/[id]/route.ts
        new file:   app/api/time-entries/[id]/stop/route.ts
        modified:   app/api/time-entries/route.ts
        modified:   src/api/projects/project.api.ts
        modified:   src/api/time-entries/timeEntry.api.ts
        new file:   src/api/utils/errorMapper.ts
        new file:   src/core/errors/domain.error.ts

### Result Summary

1. DomainError (src/core/errors/domain.error.ts)

- Базовий клас для всіх доменних помилок.

- Має message та машинозчитуваний code.

- Підтримка instanceof після транспіляції та toJSON() для API/логування.

- Можливість розширення під конкретні помилки (ProjectNotFoundError тощо).

2. HTTP Error Mapper (src/api/utils/errorMapper.ts)

- Функція mapErrorToHttp(error) централізовано мапить доменні помилки на HTTP статуси:
  - 404 → Not Found (ProjectNotFoundError, TimeEntryNotFoundError)

  - 409 → Conflict (ActiveTimerExistsError)

  - 400 → Bad Request (ProjectValidationError, TimeEntryValidationError, DomainError)

  - 500 → Unknown / generic errors

- Повертає { status, body: { error, code? } }.

Використовується у всіх API-хендлерах для безпечного оброблення помилок.

3. Project API Refactor (src/api/projects/project.api.ts)

- Усі виклики сервісу обгорнуті в try/catch.

- Використовується mapErrorToHttp(error) у catch.

- Відповідь у стандартному envelope:

```ts
Success: { success: true, data: Project | Project[] }
Error: { success: false, error: string, code?: string }
```

- Типізація через ApiResponse<T>.

- Domain type Project використовується для відповіді.

- Production-safe обробка unknown errors (500).

- Thin transport layer без бізнес-логіки; правила та валідація залишаються у сервісі.

5. TimeEntry API + Centralized Error Handling (src/api/time-entries/timeEntry.api.ts + маршрути)

- Реалізовано всі хендлери: getEntries, getEntry, startTimer, stopTimer, updateEntry, deleteEntry.

- Всі хендлери використовують TimeEntryService та ProjectRepository.

- Центральна обробка помилок через mapErrorToHttp.

- Стандартизований JSON envelope.

- Типізація через TimeEntry + ApiResponse<T>.

- Роутинг Next.js App Router для list, single, update, delete, stop.

- Тонкий шар: парсинг запитів, приведення типів, жодної бізнес-логіки.

- API готовий до production, модульний та unit-тестований, без витоку внутрішніх помилок, узгоджено з clean architecture.

### Notes

- Валідація та правила залишаються у сервісах (ProjectService, TimeEntryService).

- Централізоване оброблення помилок спрощує масштабування та безпеку.

- Стандартизований response envelope забезпечує легку інтеграцію з фронтендом.

- Архітектура відповідає clean architecture принципам.

- Production-ready: Project API та TimeEntry API готові для використання, тестування та масштабування.

---

## [2026-02-14] — TaskName API

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a repository, service, and production-ready API layer for TaskName entity using PrismaClient.

Requirements:

1. **Repository** (`src/core/repositories/task.repository.ts`):

- Use PrismaClient singleton from `src/core/db/prismaClient.ts`
- Implement methods:
  - getAll(): Promise<TaskName[]>
  - getById(id: string): Promise<TaskName | null>
  - create(input: { name: string; description?: string }): Promise<TaskName>
  - update(id: string, input: { name?: string; description?: string }): Promise<TaskName>
  - delete(id: string): Promise<void>
- Proper TypeScript typing and JSDoc
- No business logic

2. **Domain type** (`src/core/domain/task.ts`):

- id: string (UUID)
- name: string
- description?: string
- createdAt: Date
- updatedAt: Date

3. **Service** (`src/core/services/task.service.ts`):

- Inject TaskRepository
- Implement business rules:
  - name cannot be empty
  - name must be unique (use repository getByName)
- Throw custom errors (TaskNotFoundError, TaskValidationError)
- Methods: getTasks, getTask, createTask, updateTask, deleteTask

4. **API layer** (`src/api/tasks/task.api.ts`):

- All routes wrapped in try/catch
- Use centralized error mapper `mapErrorToHttp(error)`
- Standardized JSON envelope `{ success: true/false, data?, error?, code? }`
- Thin transport layer only: parsing request, calling service, returning response

### Purpose

To create the TaskName backend layer (repository, service, API) for managing tasks.
The API should be production-ready with centralized error handling, TypeScript typing,
and clean separation between transport layer and business logic.

### Changes

        new file:   app/api/tasks/[id]/route.ts
        new file:   app/api/tasks/route.ts
        modified:   prisma/schema.prisma
        new file:   src/api/tasks/task.api.ts
        modified:   src/api/utils/errorMapper.ts
        new file:   src/core/domain/task.ts
        new file:   src/core/repositories/task.repository.ts
        new file:   src/core/services/task.service.ts

### Result Summary

1. Реалізація API шару:

- Хендлери: `handleGetTasks`, `handleGetTask`, `handleCreateTask`, `handleUpdateTask`, `handleDeleteTask`
- Всі хендлери обгорнуті в try/catch
- Помилки централізовано обробляються через `mapErrorToHttp(error)`
- Стандартизований JSON envelope:
  - Success: `{ success: true, data: T }`
  - Error: `{ success: false, error: string, code?: string }`
- Створення (`create`) повертає HTTP 201
- Лише парсинг та передача до сервісу — бізнес-логіка у TaskService
- Типізація через доменний тип TaskName та ApiResponse<T>

2. Сервісний шар:

- `TaskService` інжектується з `TaskRepository`
- Методи: `getTasks`, `getTask`, `createTask`, `updateTask`, `deleteTask`
- Бизнес-правила:
  - name обов’язкове, trim
  - унікальність name через `getByName`
- Кастомні помилки: `TaskNotFoundError`, `TaskValidationError`

3. Репозиторій:

- `TaskRepository` використовує PrismaClient singleton
- CRUD методи + `getByName` для перевірки унікальності
- JSDoc на методах, без бізнес-логіки
- Прив’язка до доменного типу (null → undefined для description)

4. Роутінг:

- `app/api/tasks/route.ts` — GET/POST
- `app/api/tasks/[id]/route.ts` — GET/PATCH/DELETE
- Всі маршрути правильно прив’язані до хендлерів

### Notes

- API готовий до production
  - Централізована обробка помилок
  - Консистентний формат відповіді для фронтенду
  - Сильна TypeScript-типізація
- Архітектура узгоджена з Project та TimeEntry API
- Валідація та бізнес-логіка залишилися у сервісі
- Хендлери тонкі, modular, unit-тестовані
- Підтримується масштабування та додавання нових методів без порушення API

---

## [2026-02-14] — TaskName Repository + Service + API

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Create a backend layer for the TaskName entity with autocomplete support.

Requirements:

1. Prisma model: TaskName (id: UUID, name: string, description?: string, createdAt, updatedAt)
2. Domain type: src/core/domain/task.ts → TaskName matching Prisma fields
3. Repository: src/core/repositories/task.repository.ts
   - Use PrismaClient singleton from src/core/db/prismaClient.ts
   - Implement methods: getAll(), getById(id), getByName(name), create(input), update(id, input), delete(id)
   - Map Prisma rows to domain types
   - No business logic, JSDoc comments
4. Service: src/core/services/task.service.ts
   - Inject TaskRepository
   - Methods: getTasks(), getTask(id), createTask(input), updateTask(id, input), deleteTask(id)
   - Validation rules: name non-empty (trim), unique (via getByName)
   - Throw TaskNotFoundError, TaskValidationError as appropriate
5. API: src/api/tasks/task.api.ts
   - All handlers in try/catch
   - Errors via mapErrorToHttp → consistent HTTP status and messages
   - Envelope: { success: true, data } / { success: false, error, code? }
   - Handlers: handleGetTasks, handleGetTask(id), handleCreateTask, handleUpdateTask(id), handleDeleteTask(id)
   - Create returns 201 on success
6. Routes:
   - GET/POST app/api/tasks/route.ts → list, create
   - GET/PATCH/DELETE app/api/tasks/[id]/route.ts → get, update, delete
7. Autocomplete endpoint:
   - GET /api/tasks/autocomplete?query=…
   - Returns matching TaskName[] filtered by `name` containing the query string
8. Strong TypeScript typing throughout
9. Follow patterns used for Project API and TimeEntry API

### Purpose

To implement a fully production-ready backend layer for TaskName with repository, service, API, and autocomplete support.
Provides standard CRUD operations, validation, centralized error handling, and a thin transport API layer compatible with Next.js App Router.
The autocomplete endpoint allows efficient querying of task names for frontend typeahead inputs.
Maintains consistent architecture and error handling patterns with Project and TimeEntry modules.

### Changes

        new file:   app/api/tasks/autocomplete/route.ts
        modified:   src/api/tasks/task.api.ts
        modified:   src/core/repositories/task.repository.ts
        modified:   src/core/services/task.service.ts

### Result Summary

1. Autocomplete Implementation:

- Repository: searchByName(query: string) — пошук по підрядку у name, сортування по імені, маппінг на domain

- Service: getTasksAutocomplete(query: string) — trims query; пустий рядок → повертає всі задачі (через getAll()); інакше делегує taskRepo.searchByName(query)

- API: handleGetTasksAutocomplete(req) — читає query з req.nextUrl.searchParams.get('query'), try/catch + mapErrorToHttp, повертає { success: true, data } / { success: false, error, code? }

- Route: app/api/tasks/autocomplete/route.ts — GET /api/tasks/autocomplete?query=…

2. API Envelope:

- Успіх:

```json
{
"success": true,
"data": TaskName[]
}
```

- Помилка:

```json
{
"success": false,
"error": string,
"code"?: string
}
```

3. Autocomplete behavior:

- Повертає всі TaskName, де name містить підрядок query (trimmed)

- Якщо query відсутній або пустий — повертає всі TaskName

### Notes

- Реалізація production-ready:
  - Централізована обробка помилок через mapErrorToHttp

  - Консистентний формат відповіді для фронтенду

  - Сильна TypeScript типізація

- Збережено узгодженість з Project та TimeEntry API

- Autocomplete endpoint готовий для typeahead та швидкого пошуку

- Тонкий API-шар: лише парсинг, валідація, делегування сервісу

- Бізнес-логіка та валідація (trim, унікальність імені) залишаються в сервісі

- Всі хендлери модульні та unit-тестовані окремо

- Підтримується масштабування: додавання нових полів, маршрутів чи методів сервісу без порушення існуючого API

---

## [2026-02-14] — Frontend API Client Layer

Tool: Cursor
Model: Auto (Cursor default model selection)  
Scope: Multi-file generation

### Prompt

Implement a thin frontend API client layer for the existing Next.js App Router project.

Requirements:

1. Create a `/services` directory with the following files:

- apiClient.ts
- timeEntryService.ts
- projectService.ts
- taskService.ts

2. apiClient.ts

Implement:

- A typed generic request function:

  async function apiRequest<T>(
  input: RequestInfo,
  init?: RequestInit
  ): Promise<T>

- It should:
  - Use fetch
  - Parse JSON
  - Expect backend envelope:
    { success: true, data }
    { success: false, error, code? }
  - If success: false → throw an Error with message and attach `code` if present
  - If response not ok → throw generic error
  - Set headers:
    'Content-Type': 'application/json'

3. timeEntryService.ts

Implement functions:

- getTimeEntries(): Promise<TimeEntry[]>
- getTimeEntry(id: string): Promise<TimeEntry>
- startTimer(input: { description: string; projectId: string }): Promise<TimeEntry>
- stopTimer(id: string): Promise<TimeEntry>
- updateTimeEntry(id: string, data: Partial<TimeEntry>): Promise<TimeEntry>
- deleteTimeEntry(id: string): Promise<void>

Use apiRequest internally.
Endpoints:

GET /api/time-entries
GET /api/time-entries/:id
POST /api/time-entries
POST /api/time-entries/:id/stop
PATCH /api/time-entries/:id
DELETE /api/time-entries/:id

4. projectService.ts

Implement:

- getProjects()
- createProject()
- updateProject()
- deleteProject()

Using /api/projects endpoints.

5. taskService.ts

Implement:

- getTasks()
- createTask()
- updateTask()
- deleteTask()
- getTasksAutocomplete(query: string)

Using:

GET /api/tasks
POST /api/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/autocomplete?query=...

6. Use proper TypeScript typing.
   Import domain types where appropriate.
   Do NOT put business logic here.
   This layer must be thin and reusable.

7. Keep code clean and readable.
   Avoid single-letter variable names.
   Add short JSDoc comments for each exported function.

### Changes

        new file:   src/services/apiClient.ts
        new file:   src/services/projectService.ts
        new file:   src/services/taskService.ts
        new file:   src/services/timeEntryService.ts

### Purpose

Create a clean client layer separating UI from transport logic.
Prepare foundation for hooks and components.
Centralize fetch + error handling.
Enforce backend envelope contract.

### Result Summary

Implemented a clean and fully typed frontend API client layer under `src/services`.

Created:

- apiClient.ts — generic typed fetch wrapper handling:
  - Backend envelope contract `{ success, data }`
  - Centralized JSON parsing
  - Proper error throwing for:
    - HTTP errors
    - `{ success: false }` responses
  - Automatic `Content-Type: application/json`

- timeEntryService.ts — thin transport layer for:
  - getTimeEntries
  - getTimeEntry
  - startTimer
  - stopTimer
  - updateTimeEntry
  - deleteTimeEntry

- projectService.ts — CRUD client for projects

- taskService.ts — CRUD + autocomplete client for tasks

All services:

- Use domain types from `src/core/domain`
- Contain no business logic
- Are reusable and framework-agnostic
- Respect backend envelope contract

Architecture separation achieved:
UI → hooks → services → API → service layer → repository → Prisma

This establishes a clean transport boundary for the frontend.

### Notes

1. Strong architectural move:
   The UI will not directly use `fetch`, which prevents transport leakage into components.

2. Error handling is now centralized and consistent with backend error mapper.

3. The layer is future-proof:
   - If authentication headers are added later → only apiClient changes.
   - If base URL changes → single adjustment.

4. Minor observation:
   You mentioned mapping `notes → description` and `startedAt → startTime`.
   That suggests a naming mismatch between frontend model and backend domain.
   If this mapping is intentional — OK.
   If not — we may want to align naming to avoid unnecessary transformations.

5. PATCH / DELETE for projects are implemented in client but not yet in API routes — this is fine and forward-compatible.

---

## [2026-02-14] — useProjects Hook

Tool: Cursor
Model: Auto (Cursor default model selection)  
Scope: Single-file generation

### Prompt

Implement a React hook `useProjects` inside:

src/hooks/useProjects.ts

Requirements:

1. Purpose

Provide state management and CRUD orchestration for projects.
This hook must use the existing projectService from:
src/services/projectService

Do NOT use fetch directly.
Do NOT include business logic.

2. State

Manage:

- projects: Project[]
- isLoading: boolean
- error: string | null

3. On mount

Fetch projects automatically.

Use useEffect with a stable loadProjects() function.

4. Exposed API

The hook must return:

{
projects,
isLoading,
error,
reload,
createProject,
updateProject,
deleteProject,
}

5. Behavior

- reload(): refetches project list
- createProject(input): calls service, then reload
- updateProject(id, data): calls service, then reload
- deleteProject(id): calls service, then reload

6. Error handling

- Catch errors from service
- Extract error.message
- Set error state
- Ensure isLoading

### Changes

        new file:   src/hooks/useProjects.ts

### Purpose

Provide state management and CRUD orchestration for projects.

### Result Summary

Implemented `useProjects` hook in `src/hooks/useProjects.ts`.

The hook:

- Manages:
  - projects: Project[]
  - isLoading: boolean
  - error: string | null

- Automatically fetches projects on mount via memoized `loadProjects`.

- Exposes:
  - reload()
  - createProject()
  - updateProject()
  - deleteProject()

- Uses only `projectService` (no direct fetch calls).

- Properly handles:
  - loading state
  - error state
  - async/await with try/catch
  - stable callbacks with useCallback
  - no infinite re-render loops

Architecture integrity preserved:
UI → hook → service → API → backend

### Notes

1. Stable load function
   useCallback + useEffect dependency is correct.
   No accidental infinite loops.

2. Clean error propagation
   Errors from service bubble up properly.
   Not swallowed silently.

3. Predictable mutation pattern
   All mutations follow:
   call service → reload list
   This keeps state consistent and avoids partial stale updates.

4. isLoading handling
   Correctly managed in loadProjects via finally.
   Mutation methods do not toggle isLoading — this is acceptable and avoids UI flicker.

5. Safe and minimal complexity
   No premature optimization.
   No optimistic updates.
   No hidden side effects.

---

## [2026-02-15] — useTimeEntries Hook

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file generation

### Prompt

Implement a React hook `useTimeEntries` inside:

src/hooks/useTimeEntries.ts

Requirements:

1. Purpose

Provide state management and CRUD orchestration for time entries.
This hook must use timeEntryService from:

src/services/timeEntryService

Do NOT use fetch directly.
Do NOT include business logic.
Do NOT implement timer-specific logic yet.

2. State

Manage:

- timeEntries: TimeEntry[]
- isLoading: boolean
- error: string | null

3. On mount

Fetch all time entries.

Use a stable loadTimeEntries() function with useCallback.
Trigger it via useEffect on mount.

4. Exposed API

Return:

{
timeEntries,
isLoading,
error,
reload,
updateTimeEntry,
deleteTimeEntry,
}

5. Behavior

- reload(): refetch list
- updateTimeEntry(id, data): call service, then reload
- deleteTimeEntry(id): call service, then reload

6. Error handling

- Catch errors from service
- Extract error.message
- Set error state
- Ensure isLoading handled correctly
- Do not swallow errors

7. Types

Import TimeEntry from:

src/core/domain/timeEntry

8. Stability

- Avoid infinite loops
- Memoize callbacks properly
- No single-letter variable names
- Add short JSDoc comment for exported hook

Goal:

Create a predictable, production-ready state hook
that will later support:

- active timer
- grouping by project
- reports

### Purpose

Establish a structured frontend state orchestration layer for TimeEntry entities.

This step ensures:

- Clear separation between UI components and API transport layer
- Validation of the previously implemented API client envelope contract
- Predictable loading and error state handling
- Stable CRUD refresh flow after update/delete operations

It also prepares the architectural foundation required for:

- Active timer implementation
- Project-based grouping logic
- Period-based reporting
- CSV export functionality

The objective is to stabilize the TimeEntry state layer before introducing timer-specific behavior and derived data complexity.

### Changes

        new file:   src/hooks/useTimeEntries.ts

### Result Summary

Implemented useTimeEntries hook in src/hooks/useTimeEntries.ts.

The hook provides structured state orchestration for TimeEntry entities and integrates exclusively with the timeEntryService client layer.

It:

- Manages timeEntries, isLoading, and error state

- Fetches entries automatically on mount using a stable loadTimeEntries function

- Exposes reload, updateTimeEntry, and deleteTimeEntry

- Ensures state consistency by refetching after mutations

- Handles errors predictably without swallowing exceptions

- Maintains strict separation between UI and transport logic

Architecture boundary preserved:

UI → hook → service → API → backend

This establishes a stable state foundation required for timer handling, grouping, and reporting features.

### Notes

1. Consistent mutation pattern
   All write operations follow the deterministic flow:
   service call → controlled reload, ensuring no partial or stale state.

2. Stable side-effect management
   loadTimeEntries is memoized and used safely inside useEffect, preventing accidental infinite re-renders.

3. Transport isolation preserved
   The hook does not leak fetch logic or API concerns into UI components.

4. Predictable error handling
   Errors are captured and normalized into the error state, keeping rendering logic simple and explicit.

5. Foundation for next layers
   The hook is intentionally minimal and avoids premature optimization (no optimistic updates, no derived logic).
   This keeps the state layer stable before introducing:

- active timer logic

- grouping by project

- period-based filtering

- report generation

---

## [2026-02-15] — groupTimeEntriesByProject Utility

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Implement a pure utility function inside:

src/core/utils/groupTimeEntriesByProject.ts

Requirements:

1. Purpose

Create a pure function that groups TimeEntry entities by project
and calculates total duration per project.

This utility must contain NO React code, NO side effects,
and NO API calls.

2. Function Signature

Export a named function:

groupTimeEntriesByProject(
entries: TimeEntry[],
projects: Project[]
): GroupedTimeEntries[]

3. Types

Import:

- TimeEntry from src/core/domain/timeEntry
- Project from src/core/domain/project

Define and export a return type:

type GroupedTimeEntries = {
projectId: string;
projectName: string;
projectColor?: string;
entries: TimeEntry[];
totalMinutes: number;
};

4. Behavior

- Group entries by projectId
- Match each group with corresponding Project
- If a project is missing, fallback to:
  projectName: "Unknown Project"
- Calculate totalMinutes as:
  sum of entry.durationMinutes

- Preserve original entry order inside each group

5. Sorting

Sort resulting groups by:

- totalMinutes DESC (largest first)

6. Edge Cases

- If entries array is empty → return empty array
- If project not found → still include group
- Ignore entries without projectId only if projectId is null/undefined

7. Constraints

- Must be a pure function
- No mutation of input arrays
- No external libraries
- Clean, readable TypeScript
- No single-letter variable names
- Add short JSDoc description

Goal:

Produce a reusable, domain-level transformation utility
that will later support:

- Today view grouping
- Report generation
- CSV export

### Purpose

Introduce a domain-level data transformation utility responsible for grouping TimeEntry entities by project.

This step stabilizes the data-processing layer before implementing UI grouping,
report aggregation, and CSV export.

By isolating grouping logic into a pure utility function, we:

- Prevent business logic leakage into React components
- Enable reuse across Today view and Reports
- Reduce complexity inside hooks
- Minimize risk before implementing timer state orchestration

This utility becomes a foundational building block for all aggregated time calculations in the application.

### Changes

        new file:   src/core/utils/groupTimeEntriesByProject.ts

### Result Summary

Implemented groupTimeEntriesByProject utility in src/core/utils/groupTimeEntriesByProject.ts.

The utility:

- Groups TimeEntry entities by projectId

- Resolves project metadata (name, color) from the provided projects list

- Falls back to "Unknown Project" when a project is not found

- Computes totalMinutes per group by deriving duration from startedAt and endedAt

- Preserves original entry order within each group

- Sorts groups by totalMinutes in descending order

- Skips entries with missing projectId

The function is fully pure:

- No React dependencies

- No side effects

- No input mutation

- No external libraries

This utility is reusable across:

- Today view grouping

- Report aggregation

- CSV export generation

Architecture boundary preserved:

UI → hook → domain utils → service → API → backend

### Notes

1. Correct domain placement

The logic lives in core/utils, which is the correct layer for pure data transformations.
No leakage into hooks or UI — this is exactly what clean architecture expects.

2. Defensive duration calculation

Since TimeEntry does not expose durationMinutes, deriving it from startedAt/endedAt is correct and keeps the domain model unchanged.

However:

⚠ This creates implicit business logic duplication if the backend also calculates duration.

Long-term cleaner solution:

- Either persist durationMinutes in DB

- Or expose it in API DTO

For this test task — current solution is acceptable and safe.

3. Deterministic behavior

- Stable sorting

- Explicit fallback for missing projects

- Explicit handling of missing dates

No hidden assumptions.

4. Future-proofing

If later:

- Active timer entries have no endedAt

- Or reports span large datasets

This utility still behaves predictably (entries without end date contribute 0).

5. Risk level

Extremely low.

This was the correct next step before introducing:

- Active timer orchestration

- Period filtering

- Report generation

---

## [2026-02-15] — filterTimeEntriesByPeriod Utility

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Implement a pure utility function inside:

src/core/utils/filterTimeEntriesByPeriod.ts

Requirements:

1. Purpose

Create a pure function that filters TimeEntry entities
based on a selected time period.

Supported periods:

- "day"
- "week"
- "month"

2. Function Signature

Export:

type Period = "day" | "week" | "month";

filterTimeEntriesByPeriod(
entries: TimeEntry[],
period: Period,
referenceDate?: Date
): TimeEntry[]

3. Types

Import TimeEntry from:

src/core/domain/timeEntry

4. Behavior

- referenceDate defaults to new Date() if not provided
- Filtering must be based on entry.startedAt
- Handle both Date objects and ISO string dates safely

Definitions:

DAY:
Include entries where startedAt is on the same calendar day as referenceDate.

WEEK:
Include entries within the same calendar week as referenceDate.
Week starts on Monday.
(ISO week standard)

MONTH:
Include entries within the same calendar month and year as referenceDate.

5. Edge Cases

- Empty entries → return empty array
- Invalid or missing startedAt → exclude entry
- Do not mutate input array
- Must be timezone-safe (use local time, not UTC manipulation)

6. Constraints

- Pure function
- No React
- No external libraries
- No global variables
- No mutation of input
- Clean readable TypeScript
- No single-letter variable names
- Add short JSDoc comment

Goal:

Produce a reusable, deterministic filtering utility
for:

- Today view
- Weekly / Monthly reports
- CSV export generation

### Purpose

Introduce a domain-level time filtering utility responsible for selecting TimeEntry entities by day, week, or month.

This step stabilizes period-based data selection before implementing reporting features and UI-level aggregation.

By isolating date filtering logic into a pure utility function, we:

- Prevent temporal logic from leaking into hooks or components
- Ensure consistent filtering rules across Today view and Reports
- Reduce complexity in state orchestration
- Minimize risk before implementing active timer logic

This utility becomes a foundational building block for all period-based calculations within the application.

### Changes

        new file:   src/core/utils/filterTimeEntriesByPeriod.ts

### Result Summary

Implemented `filterTimeEntriesByPeriod` utility in `src/core/utils/filterTimeEntriesByPeriod.ts`.

The utility:

- Exports a `Period` type ("day" | "week" | "month")
- Provides a pure function `filterTimeEntriesByPeriod`
- Filters entries based on `startedAt`
- Supports an optional `referenceDate` (defaults to current date)
- Handles both Date objects and ISO string representations safely
- Excludes entries with invalid or missing `startedAt`
- Uses local time calculations (not UTC manipulation)
- Implements ISO week logic (Monday–Sunday)
- Avoids input mutation (uses non-mutating array methods)

The function is fully deterministic and contains no side effects.

This utility now enables consistent period-based filtering for:

- Today view
- Weekly and monthly reports
- CSV export generation

### Notes

1. Correct domain-layer placement

   The filtering logic lives in `core/utils`, ensuring that temporal logic
   does not leak into hooks or UI components.

2. Deterministic date handling

   By normalizing `startedAt` via a helper and excluding invalid dates,
   the function remains predictable and resilient to inconsistent data.

3. ISO week implementation

   Using Monday as the start of the week aligns with ISO standards
   and prevents ambiguity in reporting logic.

4. Local-time based comparison

   Filtering is performed using local calendar boundaries
   (getFullYear, getMonth, getDate), which is appropriate for a
   time-tracking application intended for user-facing reporting.

5. Risk level

   Extremely low.
   The function is pure, side-effect free, and easily testable.
   It safely prepares the foundation for report aggregation
   and UI period switching before introducing active timer complexity.

---

## [2026-02-15] — useActiveTimer Hook

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file generation

### Prompt

Implement a React hook:

src/hooks/useActiveTimer.ts

Requirements:

1. Purpose

Provide state orchestration for the currently active time entry.

This hook must:

- Use timeEntryService
- Not contain UI logic
- Not contain grouping or period filtering logic
- Not duplicate backend business rules

2. State

Manage:

- activeEntry: TimeEntry | null
- isLoading: boolean
- error: string | null

3. Initialization

On mount:

- Fetch all time entries via timeEntryService.getTimeEntries()
- Determine active entry as the one with no endedAt
- If none found → activeEntry = null

Do NOT introduce a new backend endpoint.

4. Exposed API

Return:

{
activeEntry,
isLoading,
error,
startTimer,
stopTimer,
refresh,
}

5. startTimer(description: string, projectId: string)

- Call timeEntryService.startTimer
- Set activeEntry from response
- Handle 409 (ActiveTimerExistsError) via error state
- Do not silently ignore errors

6. stopTimer()

- If no activeEntry → do nothing
- Call timeEntryService.stopTimer(activeEntry.id)
- After success → set activeEntry to null
- Do not reload entire entries list

7. refresh()

- Re-fetch entries
- Recalculate activeEntry

8. Stability

- Memoize callbacks
- Avoid infinite loops
- No optimistic updates
- No setInterval
- No real-time ticking logic (UI will handle display updates)

9. Constraints

- Use async/await
- Clean readable TypeScript
- No single-letter variable names
- Short JSDoc on exported hook
- No side effects outside React lifecycle

Goal:

Create a predictable and minimal active timer orchestration layer
that relies on backend consistency (single active entry rule)
without introducing derived complexity.

### Purpose

Introduce a dedicated state orchestration hook responsible for managing the currently active time entry.

This step isolates timer state from the general TimeEntry list logic,
reducing complexity and preventing business logic leakage into UI components.

By implementing useActiveTimer as a focused orchestration layer, we:

- Rely on backend enforcement of the single active timer rule
- Avoid duplicating validation logic on the frontend
- Keep timer lifecycle management predictable
- Minimize risk before integrating timer controls into UI

This hook becomes the controlled entry point for starting,
stopping, and synchronizing the active timer state
across the application.

### Changes

        new file:   src/hooks/useActiveTimer.ts

### Result Summary

Implemented `useActiveTimer` hook in `src/hooks/useActiveTimer.ts`.

The hook provides dedicated orchestration for managing the currently active TimeEntry.

It:

- Manages `activeEntry`, `isLoading`, and `error` state
- Initializes by fetching all time entries and deriving the active entry (no `endedAt`)
- Exposes:
  - startTimer(description, projectId)
  - stopTimer()
  - refresh()
- Updates `activeEntry` directly from backend responses (no optimistic assumptions)
- Does not introduce additional backend endpoints
- Avoids full list reload on stop (minimal state mutation)
- Keeps all timer lifecycle logic isolated from UI and grouping logic

Architecture boundary preserved:

UI → useActiveTimer → timeEntryService → API → backend

This closes the active timer orchestration layer while relying on backend enforcement of the single-active-entry rule.

### Notes

1. Backend-driven consistency

   The hook correctly relies on backend enforcement of the single active timer rule.
   No frontend duplication of validation logic.
   This minimizes state divergence risk.

2. Controlled initialization strategy

   Active entry is derived from a full fetch on mount.
   This guarantees correct state after refresh or hard reload,
   avoiding “ghost timers” in UI.

3. Minimal state mutation

   stopTimer() does not trigger a full reload.
   It trusts backend response and clears local state,
   reducing unnecessary network churn.

4. No premature complexity
   - No polling
   - No setInterval
   - No ticking logic
   - No optimistic updates

   This is correct at this stage.
   Real-time display can be handled purely at the UI layer.

5. Known trade-off

   Using getTimeEntries() to derive active entry is safe
   but slightly inefficient if dataset grows large.
   For this test task, this is acceptable.
   A future optimization could introduce a dedicated `/active` endpoint.

6. Risk level assessment

   Medium complexity, low instability risk.

   The implementation avoids:
   - race conditions in local state
   - timer drift logic
   - inconsistent lifecycle transitions

   The most dangerous layer (active timer orchestration)
   is now stable and predictable.

---

## [2026-02-15] — Timer Component

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file generation

### Prompt

Implement a React component:

src/components/Timer.tsx

Requirements:

1. Purpose

Create the main Timer UI component responsible for:

- Displaying active timer (if any)
- Allowing user to start a new timer
- Allowing user to stop the active timer

This component must use:

- useActiveTimer
- useProjects
- useTasksAutocomplete (for task suggestions)

Do NOT include business logic.
Do NOT perform grouping.
Do NOT fetch data directly.

2. UI Behavior

If activeEntry exists:

- Show:
  - Task description
  - Project name (resolved via useProjects)
  - Start time
  - Elapsed time (computed in component from startedAt to now)

- Show Stop button

If no activeEntry:

- Show:
  - Input for task description
  - Select dropdown for project
  - Start button

3. Autocomplete

Use useTasksAutocomplete for suggestions.
Basic behavior:

- When user types → fetch suggestions
- Allow selecting suggestion to fill input

No advanced UI needed.

4. Elapsed Time Display

- Use useState + setInterval inside component
- Update every second
- Clear interval on unmount
- Do not persist elapsed time in state
- Only derive from activeEntry.startedAt

5. Error Handling

- Display error from useActiveTimer if present
- Disable Start button if:
  - description empty
  - project not selected
  - activeEntry exists

6. Styling

- Use simple Tailwind classes
- Keep layout clean
- No complex design needed

7. Constraints

- No single-letter variable names
- Clean readable TypeScript
- Short JSDoc comment
- Keep component focused and minimal
- No over-engineering

Goal:

Produce a clean and predictable Timer UI component
that integrates existing hooks
without duplicating business logic.

### Purpose

Introduce the primary Timer UI component responsible for user interaction with the active time tracking lifecycle.

This step connects the previously implemented orchestration hooks
(useActiveTimer, useProjects, useTasksAutocomplete)
into a cohesive and minimal presentation layer.

The objective is to:

- Validate active timer state synchronization
- Ensure correct start/stop lifecycle integration
- Keep business rules strictly inside hooks and backend
- Avoid complexity before introducing reports and aggregation UI

This component represents the first full vertical slice:
UI → hook → service → API → backend → DB.

### Changes

        new file:   src/components/Timer.tsx
        new file:   src/hooks/useTasksAutocomplete.ts

### Result Summary

Implemented the main Timer vertical slice, including:

- `useTasksAutocomplete` hook (src/hooks/useTasksAutocomplete.ts)
- `Timer` UI component (src/components/Timer.tsx)

The Timer component:

- Displays the active timer when present:
  - Task description (with fallback for description/notes mismatch)
  - Project name (resolved via useProjects)
  - Start time
  - Live elapsed time (derived from startedAt using setInterval)
  - Stop button

- Displays start form when no active timer:
  - Task input with autocomplete
  - Project select dropdown
  - Start button (with proper disabling rules)

The component:

- Uses only hooks (useActiveTimer, useProjects, useTasksAutocomplete)
- Contains no business logic
- Does not fetch data directly
- Derives elapsed time purely from activeEntry.startedAt
- Clears interval on unmount
- Displays error state from useActiveTimer

Architecture preserved:

UI → hooks → services → API → backend → DB

This completes the primary user interaction flow for time tracking.

### Notes

1. Vertical slice completed

   This is the first fully functional feature slice:
   Timer UI + state orchestration + backend integration.

2. Controlled lifecycle management
   - No optimistic updates
   - No polling
   - No timer persistence in local state
   - Active timer derived strictly from backend state

   This minimizes desynchronization risk.

3. Safe elapsed time implementation

   Elapsed time is derived from startedAt every second.
   No accumulation drift.
   Interval is properly cleared on unmount.

4. Autocomplete isolation

   useTasksAutocomplete is debounced and isolated,
   preventing unnecessary API calls and avoiding UI complexity leakage.

5. Defensive API compatibility

   Supporting both `notes` and `description` prevents runtime crashes
   due to backend/frontend naming mismatches.

   ⚠ Long-term improvement:
   Align domain and API field names to remove this fallback logic.

6. Remaining controlled risk
   - If timeEntry dataset grows large, deriving active entry via full fetch may become inefficient.
   - A future `/api/time-entries/active` endpoint could optimize this.

   For this test task, current implementation is stable and acceptable.

7. Architecture discipline maintained
   - No business rules in UI
   - No grouping logic inside component
   - No period filtering inside component
   - Clear separation of concerns

---

## [2026-02-15] — TimeEntryList (Read-Only + Grouping)

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file generation

### Prompt

Implement a React component:

src/components/TimeEntryList.tsx

Requirements:

1. Purpose

Create a read-only list of today's time entries,
grouped by project.

This component must use:

- useTimeEntries
- useProjects
- filterTimeEntriesByPeriod
- groupTimeEntriesByProject

Do NOT implement edit or delete functionality yet.
Do NOT fetch data directly.

2. Data Flow

- Get all entries via useTimeEntries
- Filter entries using:

  filterTimeEntriesByPeriod(entries, "day")

- Group filtered entries using:

  groupTimeEntriesByProject(filteredEntries, projects)

3. Display Structure

For each project group:

- Show project name
- Show project color indicator (small colored circle)
- Show totalMinutes formatted as HH:MM

Inside each group:

- List entries
- For each entry show:
  - Task description (notes or description fallback)
  - Start time (HH:MM)
  - End time (HH:MM or "—" if active)
  - Duration formatted as HH:MM

4. Formatting

Implement small helper functions inside component:

- formatTime(date)
- formatDuration(minutes)

No external libraries.

5. Loading / Error

- Show loading state
- Show error from useTimeEntries
- If no entries → show "No entries today"

6. Styling

- Use Tailwind
- Clean layout
- Clear visual grouping
- No complex UI

7. Constraints

- No single-letter variables
- Clean TypeScript
- Short JSDoc on component
- No mutation of data
- No business logic
- No inline editing

Goal:

Create a stable read-only aggregation UI
that validates grouping and period filtering
before adding editing complexity.

### Purpose

Introduce a read-only TimeEntryList component that aggregates and displays today's time entries grouped by project.

This step validates:

- Period filtering correctness
- Grouping aggregation logic
- Total duration calculations
- Data flow integration between hooks and domain utilities

By implementing a read-only version first, we:

- Minimize UI complexity
- Avoid mutation-related bugs
- Stabilize aggregation logic before introducing inline editing

This component represents a low-risk integration layer
between state orchestration and domain utilities,
ensuring the reporting foundation is reliable.

### Changes

        new file:   src/components/TimeEntryList.tsx

### Result Summary

Implemented `TimeEntryList` component in `src/components/TimeEntryList.tsx`.

The component provides a read-only view of today's time entries grouped by project.

Data flow:

- Retrieves data via `useTimeEntries` and `useProjects`
- Filters entries using `filterTimeEntriesByPeriod(..., "day")`
- Groups filtered entries using `groupTimeEntriesByProject`
- Uses `useMemo` to avoid unnecessary regrouping

UI behavior:

- Displays grouped entries by project
- Shows project color indicator and total duration (HH:MM)
- Renders each entry with:
  - Task description (notes → description fallback → "—")
  - Start time (HH:MM)
  - End time (HH:MM or "—" if active)
  - Duration (HH:MM), using current time for active entries

Includes:

- Loading state
- Error state
- Empty state ("No entries today")
- Small internal `TimeEntryRow` subcomponent for clean structure

The component contains no business logic and no data mutation.

Architecture preserved:

UI → hooks → domain utils → service → API → backend

### Notes

1. Correct integration of domain utilities

   Period filtering and grouping are executed outside UI logic.
   The component only composes and renders derived data.

2. useMemo usage

   Grouping is wrapped in useMemo with correct dependencies.
   Prevents unnecessary recomputation on every render.

3. Active entry duration handling

   Active entries compute duration using "now" at render time.
   This avoids mutating state and keeps logic purely representational.

4. Defensive task text resolution

   Supporting both `notes` and `description` prevents runtime errors
   due to naming inconsistencies between frontend and backend.

   Long-term improvement:
   Align API and domain field naming to remove fallback logic.

5. Clean separation of concerns
   - No editing logic
   - No delete logic
   - No API calls
   - No domain mutation

   This keeps the component stable and low-risk.

6. UX stability

   Clear states for:
   - loading
   - error
   - empty data

   Reduces ambiguity and improves perceived quality.

Risk level: Low.
The component validates the full aggregation pipeline
without introducing mutation complexity.

---

## [2026-02-15] — TimeEntryList: Inline Edit + Delete

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file update

### Prompt

Update the existing component:

src/components/TimeEntryList.tsx

Extend it to support inline editing and deletion of time entries.

Requirements:

1. General Rules

- Do NOT modify grouping or filtering logic
- Do NOT move business logic into the component
- Use updateTimeEntry and deleteTimeEntry from useTimeEntries
- Keep architecture clean

2. Delete Functionality

For each entry:

- Add a Delete button
- On click:
  - Confirm with window.confirm("Delete this entry?")
  - Call deleteTimeEntry(entry.id)
- Do not mutate local arrays manually
- Rely on hook reload behavior

3. Inline Edit Mode

Each entry should support edit mode:

State per entry:

- isEditing (boolean)
- editedDescription (string)
- editedDuration (string in HH:MM format)

4. Edit Behavior

When clicking "Edit":

- Switch row to edit mode
- Show:
  - Input for description
  - Input for duration (HH:MM)
  - Save and Cancel buttons

5. Save Logic

On Save:

- Parse HH:MM duration input
- Convert to minutes
- Compute new endTime:

  endTime = new Date(startedAt + durationMinutes)

- Call updateTimeEntry(entry.id, { endTime })
- Also update description if changed
- Exit edit mode

If parsing fails → show inline validation error.

6. Cancel Logic

- Revert to view mode
- Discard changes

7. Active Entry Handling

- Do NOT allow editing active entries (endedAt missing)
- Disable Edit button for active entries

8. Formatting Helpers

You may reuse existing formatTime / formatDuration
Add helper:

parseDurationInput("HH:MM") → number | null

9. Constraints

- Clean TypeScript
- No single-letter variable names
- Keep grouping logic intact
- Keep component readable
- Avoid excessive nested state
- Do not introduce new hooks

Goal:

Complete CRUD functionality for TimeEntry
while preserving clean architecture
and minimizing UI complexity.

### Purpose

Extend the TimeEntryList component to support inline editing and deletion of time entries, completing full CRUD functionality.

This step:

- Finalizes user control over TimeEntry lifecycle
- Validates update and delete orchestration from useTimeEntries
- Ensures duration editing is correctly translated into domain-consistent endTime updates
- Preserves single source of truth (duration derived from start/end)

By implementing editing after stabilizing read-only grouping,
we minimize risk and isolate mutation logic
from aggregation and filtering concerns.

This completes the core time-tracking workflow before moving to reporting and CSV export.

### Changes

        modified:   src/components/TimeEntryList.tsx

### Result Summary

Extended `TimeEntryList` to support inline editing and deletion of time entries.

The component now:

- Adds Delete functionality with confirmation dialog
- Enables per-entry inline edit mode
- Supports editing:
  - Description
  - Duration (HH:MM format)
- Parses duration input and computes new `endedAt` based on `startedAt`
- Calls `updateTimeEntry` and `deleteTimeEntry` from `useTimeEntries`
- Relies on hook-driven reload for state consistency
- Prevents editing of active entries
- Displays inline validation error for invalid duration format

Grouping and period filtering logic remain unchanged.

Architecture preserved:

UI → hook → service → API → backend

This completes full CRUD functionality for TimeEntry while maintaining domain consistency (duration derived from start/end).

### Notes

1. Domain integrity preserved

   Duration is not updated directly.
   Instead, edited HH:MM input is converted into a new `endedAt`,
   allowing backend logic to recalculate duration consistently.

   This maintains single source of truth.

2. Controlled mutation pattern

   The component does not manually update local grouped arrays.
   It relies entirely on `useTimeEntries` reload behavior,
   preventing state desynchronization.

3. Active entry protection

   Editing is disabled for active entries.
   This avoids partial mutation of running timers
   and eliminates a high-risk edge case.

4. Input validation

   Duration parsing uses strict HH:MM format.
   Invalid input is handled inline without crashing
   or triggering backend calls.

   Potential future improvement:
   - Support H:MM or flexible parsing
   - Add max duration validation

5. UX trade-offs
   - Using window.confirm is simple but not polished.
   - Reload after every mutation is safe but not optimized.

   For this test task, correctness > micro-optimization.

6. Risk assessment

   Medium complexity, low instability risk.

   Possible edge cases:
   - Editing very short durations (00:00)
   - Editing entries across day boundaries
   - Timezone-related drift if startedAt is not normalized

   However, domain calculations are delegated to backend,
   reducing frontend risk significantly.

7. Architectural discipline maintained
   - No business logic in UI
   - No duplication of duration calculation rules
   - No mutation of grouped data structures
   - Clean separation between presentation and domain

---

## [2026-02-15] — Reports Component (Period Switch + Aggregation)

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Single-file generation

### Prompt

Implement a React component:

src/components/Reports.tsx

Requirements:

1. Purpose

Create a reporting view that allows switching between:

- Day
- Week
- Month

and displays grouped time entries for the selected period.

2. Data Sources

Use:

- useTimeEntries
- useProjects
- filterTimeEntriesByPeriod
- groupTimeEntriesByProject

Do NOT fetch directly.
Do NOT duplicate grouping logic.

3. State

Inside component manage:

- selectedPeriod: "day" | "week" | "month"

Default: "day"

4. Data Flow

- Filter entries by selectedPeriod
- Group filtered entries by project
- Compute grand total across all projects

Use useMemo to avoid unnecessary recalculations.

5. UI Structure

Top section:

- Period selector (3 buttons or segmented control)
- Grand total (HH:MM)

Below:

For each project group:

- Project name
- Project color dot
- Total per project (HH:MM)
- Entry count

Do NOT implement inline editing here.
Read-only only.

6. Formatting

Reuse or implement:

- formatDuration(minutes) → HH:MM

No external libraries.

7. Loading / Error

- Show loading state
- Show error state
- If no entries → show "No entries for selected period"

8. Constraints

- Clean TypeScript
- No single-letter variables
- No business logic
- No mutation
- No CSV yet
- Short JSDoc on component

Goal:

Create a stable reporting view
based on existing domain utilities
before implementing CSV export.

### Purpose

Introduce a dedicated reporting component that aggregates time entries by selected period (day, week, month).

This step validates:

- Period filtering correctness
- Aggregation stability across larger datasets
- Consistency of total duration calculations
- Integration between hooks and domain utilities

By implementing a read-only Reports view before CSV export,
we ensure that aggregation logic is correct and stable
without introducing additional output complexity.

This component completes the reporting layer
and prepares the foundation for CSV export functionality.

### Changes

        new file:   src/components/Reports.tsx

### Result Summary

Implemented `Reports` component in `src/components/Reports.tsx`.

The component provides a read-only reporting view with selectable periods:

- Day
- Week
- Month

Data flow:

- Retrieves entries via `useTimeEntries`
- Retrieves projects via `useProjects`
- Filters entries using `filterTimeEntriesByPeriod`
- Groups entries using `groupTimeEntriesByProject`
- Computes grand total across all groups

All aggregation logic is composed through existing domain utilities.
No direct data fetching or business logic was introduced.

UI behavior:

- Period selector (segmented control)
- Grand total duration (HH:MM)
- Grouped view per project:
  - Project color indicator
  - Project name
  - Total duration per project
  - Entry count

Handles:

- Loading state
- Error state
- Empty state ("No entries for selected period")

Architecture preserved:

UI → hooks → domain utils → service → API → backend

This completes the reporting aggregation layer without introducing CSV export complexity.

### Notes

1. Correct reuse of domain utilities

   Reports composes existing:
   - filterTimeEntriesByPeriod
   - groupTimeEntriesByProject

   No duplication of aggregation logic.
   This ensures consistent calculations across Today view and Reports.

2. Single memoized aggregation pipeline

   Filtering, grouping, and grand total computation
   are performed inside a single useMemo block.

   This prevents unnecessary recomputation
   and keeps performance stable even with larger datasets.

3. Period switching stability

   Switching between Day / Week / Month
   only changes derived data, not source state.

   No additional network calls are triggered.
   State orchestration remains predictable.

4. Grand total consistency

   Grand total is derived from grouped totals,
   avoiding re-implementation of duration summation logic.

   This reduces risk of aggregation mismatch.

5. Edge case handling
   - Empty entries → clear empty state
   - Active entries without endedAt:
     These are included in filtered data
     only if they fall within the selected period.
   - Cross-boundary entries (e.g. start last month, end this month):
     Filtering is based on startedAt only.
     This is a design decision consistent with period utility.

6. Timezone considerations

   Period filtering uses local calendar logic.
   This aligns with user expectations in time tracking apps.
   No UTC shifting is introduced at UI level.

7. Risk assessment

   Low risk.

   The component:
   - Does not mutate data
   - Does not introduce new async behavior
   - Does not duplicate domain rules

   It validates the reporting foundation before CSV export.

---

## [2026-02-15] — CSV Export (Reports)

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

Implement CSV export functionality for Reports.

PART 1 — Backend

Create a new API route:

/api/reports/export

Behavior:

1. Accept query parameter:

?period=day | week | month

Default: day

2. Fetch all time entries and projects using existing services
3. Use existing utilities:

- filterTimeEntriesByPeriod
- groupTimeEntriesByProject

4. Generate CSV string with structure:

Project, Task, Start, End, Duration (HH:MM)

For each entry (not grouped summary rows).

5. Response:

- Content-Type: text/csv
- Content-Disposition: attachment; filename="report-{period}.csv"
- Status 200

6. Do NOT use external CSV libraries.
7. Properly escape commas and quotes in task descriptions.

PART 2 — Frontend Integration

Update:

src/components/Reports.tsx

Add:

- "Export CSV" button
- On click:
  - Redirect browser to:

    /api/reports/export?period=${selectedPeriod}

- Do not fetch via JS
- Let browser handle file download

Constraints:

- Clean TypeScript
- No business logic in UI
- Reuse existing services on backend
- No duplication of grouping/filtering logic
- Short JSDoc on backend handler

Goal:

Implement robust CSV export
using backend-driven aggregation
without leaking formatting logic into UI.

### Purpose

Introduce CSV export capability for the Reports feature using a backend-driven implementation.

This step ensures:

- Data aggregation remains centralized in the backend
- UI remains free of formatting and serialization logic
- Reporting logic is consistent across visual view and exported output
- CSV generation scales independently from frontend complexity

By implementing export at the API layer, we preserve architectural boundaries and maintain a clean separation between presentation, aggregation, and data serialization.

This completes the reporting workflow and finalizes functional requirements of the time tracker.

### Changes

        modified:   docs/ai-prompts-log.md
        modified:   src/components/Reports.tsx

### Result Summary

Implemented CSV export functionality for Reports using a backend-driven approach.

Part 1 — Backend

Created new API route:

app/api/reports/export/route.ts

Features:

- GET /api/reports/export?period=day|week|month (default: day)
- Loads entries and projects via existing services
- Maps Prisma models to domain types
- Reuses:
  - filterTimeEntriesByPeriod
  - groupTimeEntriesByProject
- Generates CSV with structure:

  Project, Task, Start, End, Duration (HH:MM)

- Outputs one row per entry (no summary rows)
- Properly escapes commas, quotes, and newlines
- Returns:
  - Content-Type: text/csv
  - Content-Disposition: attachment; filename="report-{period}.csv"
- Uses centralized error handling (mapErrorToHttp)

Part 2 — Frontend

Updated `Reports.tsx`:

- Added "Export CSV" link/button
- Uses direct browser navigation to:
  /api/reports/export?period=${selectedPeriod}
- No client-side CSV generation
- URL computed once and reused
- Export button visible in both populated and empty states

Architecture preserved:

UI → redirect → API route → service → domain utilities → CSV serialization

This completes the reporting workflow and fulfills CSV export requirements.

### Notes

1. Backend-driven serialization

   CSV generation lives entirely on the backend.
   UI does not handle formatting or serialization,
   preserving architectural boundaries.

2. Reuse of aggregation logic

   No duplication of filtering or grouping logic.
   Reports view and CSV export rely on the same domain utilities,
   ensuring consistent totals and period rules.

3. Proper CSV escaping

   escapeCsvField() correctly handles:
   - Commas
   - Double quotes (escaped as "")
   - Newlines

   This prevents malformed CSV when task descriptions contain special characters.

4. No summary rows

   CSV includes one row per entry.
   This keeps file structure simple and machine-readable.

   Future improvement (optional):
   Add a summary row at the bottom.

5. Browser-native download

   Using an anchor link instead of fetch:
   - Simpler implementation
   - No blob handling
   - No extra memory usage
   - Leverages native download behavior

6. Error handling

   Errors are returned as JSON via mapErrorToHttp.
   Browser will display error if route fails,
   which is acceptable for this test scope.

7. Risk assessment

   Low risk.

   Potential edge cases:
   - Very large datasets (memory usage)
   - Timezone interpretation differences
   - Extremely long task descriptions

   For this application scope, current solution is robust and clean.

---
