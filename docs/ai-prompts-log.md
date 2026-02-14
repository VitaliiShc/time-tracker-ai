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
