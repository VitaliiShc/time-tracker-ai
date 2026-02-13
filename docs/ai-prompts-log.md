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
