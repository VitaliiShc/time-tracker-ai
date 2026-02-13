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

        new file:   app/api/projects/route.ts
        new file:   app/api/task-names/route.ts
        new file:   app/api/time-entries/route.ts
        new file:   docs/ai-prompts-log.md
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
        new file:   app/api/task-names/route.ts
        new file:   app/api/time-entries/route.ts
        new file:   docs/ai-prompts-log.md
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
        new file:   docs/ai-prompts-log.md
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
        new file:   src/core/domain/project.ts
        new file:   src/core/domain/taskName.ts
        new file:   src/core/domain/timeEntry.ts
        new file:   src/core/repositories/project.repository.ts
        new file:   src/core/repositories/taskName.repository.ts
        new file:   src/core/repositories/timeEntry.repository.ts
        new file:   src/core/services/project.service.ts
        new file:   src/core/services/taskName.service.ts
        new file:   src/core/services/timeEntry.service.ts
        new file:   src/core/repositories/taskName.repository.ts
        new file:   src/core/repositories/timeEntry.repository.ts
        new file:   src/core/services/project.service.ts
        new file:   src/core/services/taskName.service.ts
        new file:   src/core/services/timeEntry.service.ts
        new file:   src/presentation/components/projects/ProjectList.tsx
        new file:   src/core/services/taskName.service.ts
        new file:   src/core/services/timeEntry.service.ts
        new file:   src/presentation/components/projects/ProjectList.tsx
        new file:   src/presentation/components/task-names/TaskNameAutocomplete.tsx
        new file:   src/presentation/components/time-entries/TimeEntryForm.tsx
        new file:   src/core/services/timeEntry.service.ts
        new file:   src/presentation/components/projects/ProjectList.tsx
        new file:   src/presentation/components/task-names/TaskNameAutocomplete.tsx
        new file:   src/presentation/components/time-entries/TimeEntryForm.tsx
        new file:   src/presentation/components/projects/ProjectList.tsx
        new file:   src/presentation/components/task-names/TaskNameAutocomplete.tsx
        new file:   src/presentation/components/time-entries/TimeEntryForm.tsx
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

        modified:   docs/ai-prompts-log.md
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

        modified:   docs/ai-prompts-log.md
        modified:   src/core/repositories/project.repository.ts

### Result Summary

Створено клас ProjectRepository у src/core/repositories/project.repository.ts.

Використано PrismaClient singleton з src/core/db/prismaClient.ts.

Типи TypeScript: використані Prisma-generated Project та власні інтерфейси для input.

Реалізовані методи:

getAll() — повертає всі проекти, відсортовані за датою створення (новіші першими)

getById(id: string) — отримання проекту за ID або null

create(data) — створює новий проект з name і color

update(id, data) — оновлює лише надані поля (partial update)

delete(id) — видаляє проект за ID

Реалізовано обробку помилок Prisma для подальшого використання на сервісному рівні

Business logic відсутній — чистий data access layer

Готово для використання у сервісах та подальшої інтеграції з UI

### Notes

Використання partial update через conditional spreading — сучасний best practice для репозиторіїв

Типізація забезпечує повну безпеку при використанні у сервісах

Підготовка до наступного кроку: створення TimeEntry repository

Рекомендується після генерації додати unit-тести для CRUD методів (опційно, але добре для демонстрації професійного підходу)

Всі зміни можна легко логувати через git diff для наступних кроків

---
