## AI Development Approach

This project was built using structured AI-assisted development.
All major architectural decisions and feature implementations were generated through AI tools and reviewed manually.

# AI Prompts Log

This document contains a log of AI-assisted development steps.
All architectural and structural decisions were generated using AI tools as required by the task.

---

## [2026-02-13] — Example

Tool: Cursor
Model: Auto (Cursor default model selection)
Scope: Multi-file generation

### Prompt

### Purpose

### Changes

### Result Summary

### Notes

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
