# ⏲️ Time Tracker

Production-ready time tracking web application built with Next.js 16 + Prisma + SQLite, deployed on Fly.io.

## 🔗 Live Demo

<https://vitaliishc-time-tracker.fly.dev>

## 💾 GitHub Repository

<https://vitaliishc-time-tracker.fly.dev>

## 📌 Project Overview

Time Tracker is a full-stack web application that allows users to:

- Track working time per project
- Manage projects and task names
- Edit time entries manually
- View reports (day / week / month)
- Export reports to CSV

The application was built strictly using AI-assisted development tools and follows a clean architecture approach.

## 🤖 AI Development Approach

This project was built using a structured AI-assisted development workflow.

All architectural decisions, feature implementations, and refactorings were generated through AI tools (Cursor + GPT models) and then reviewed, validated, and adjusted to ensure correctness, consistency, and production readiness.

Every significant change is reproducible and documented in:

`docs/ai-prompts-log.md`

The goal was not only to build a working product, but to demonstrate the ability to:

- Architect systems through AI collaboration
- Maintain domain consistency
- Enforce clean architecture principles
- Refactor and validate AI-generated code
- Deliver production-ready deployment

## 🏗️ Architecture

The project follows a layered, clean structure:

- presentation (UI components)
- hooks / services (state & client logic)
- API layer (Next.js route handlers)
- core/domain (business logic)
- repositories (data persistence abstraction)
- Prisma ORM (database layer)

### Key Domain Entities

- `TimeEntry`
- `Project`
- `TaskName`

## ⚙️ Tech Stack

### Frontend

- Next.js 16 (App Router)
- React
- TypeScript

### Backend

- Next.js API Routes
- Clean Service Layer (Application Services)
- Repository Pattern

### Database

- SQLite (production persistent volume)
- Prisma ORM

### Styling

- TailwindCSS

### Deployment

- Fly.io
- Docker multi-stage build
- Persistent mounted volume (/data/dev.db)

## 🗄️ Database Model

### TimeEntry

- `description`
- `startTime`
- `endTime`
- `duration` (seconds, derived)
- `projectId`

### Project

- `name`
- `color`

### TaskName

- `name`
- `description`

## ⏱️ Duration Logic (Important Design Decision)

In this system:

### Source of truth:

- `startTime`
- `endTime`

### Derived field:

- `duration`
  Duration is never edited directly.

### Why?

- Ensures single source of truth
- Prevents inconsistencies between time range and duration
- Keeps domain logic in backend service layer
- Makes API safer and simpler
- Keeps UI as presentation-only layer

Manual editing in format `HH:mm` updates `startTime` / `endTime`, and backend recalculates `duration`.

This guarantees domain consistency.

## 🚀 Features

**1️⃣ Main Time Tracker**

- Start / Stop timer
- Autocomplete task name
- Select project
- Active timer always visible

**2️⃣ Manage Time Entries**

- Edit task name
- Edit project
- Manual time correction (`HH:mm` format)
- Delete entries
- Grouping by project
- Total time per project

**3️⃣ Project Management**

- Dedicated page
- Create / Edit projects
- Color tagging

**4️⃣ Reports**

- Filter by day / week / month
- CSV export

## 🧠 Architectural Highlights

- Strict API envelope consistency
- Centralized error mapping (Domain → HTTP)
- No business logic inside UI
- Duration recalculation strictly in service layer
- Single active timer constraint
- SQLite persistence with mounted volume

## 🛠️ Local Development

**1. Clone repository**

```bash
git clone https://github.com/VitaliiShc/time-tracker-ai.git
cd time_tracker
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment**

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

**4. Run migrations**

```bash
npx prisma migrate deploy
```

**5. Start dev server**

```bash
npm run dev
```

App will run at:

```arduino
http://localhost:3000
```

## 🐳 Production Deployment (Fly.io)

- Docker multi-stage build
- SQLite stored at `/data/dev.db`- - Volume mounted via Fly
- `DATABASE_URL=file:/data/dev.db`

**Start command:**

```bash
npx prisma migrate deploy && npm start
```

**Autosleep enabled:**

```toml
auto_stop_machines = "stop"
min_machines_running = 0
```

Machine automatically wakes on request.

## 📄 Development Notes

**2026-02-15**

- Implemented full App Shell (Dashboard / Projects / Reports)
- Fixed Projects API envelope bug
- Implemented dynamic route handling for Next.js 16
- Restored full Projects CRUD
- Verified end-to-end functionality

**2026-02-16**

- Implemented centralized domain error handling
- Fixed SQLite persistence via Fly volume
- Implemented Docker multi-stage production setup
- Renamed Fly app to match personal branding
- Normalized domain naming (description/startTime/endTime)
- Verified autosleep and wake behavior

## 📚 Lessons Learned

- In Next.js 16 App Router, dynamic route params must be awaited.
- Double-wrapping NextResponse silently breaks API contracts.
- Strict API envelope consistency prevents frontend crashes.
- Duration must remain derived, never editable directly.
- SQLite in production requires mounted volume.
- Fly machines autosleep by default — must understand lifecycle.
- Naming consistency across Prisma, domain and API prevents mapping complexity.

## 📊 Evaluation Criteria Coverage

✔ Clean architecture

✔ Clear separation of concerns

✔ Domain-driven approach

✔ Persistent storage

✔ Production-ready deployment

✔ Reproducible AI-assisted development

## 🏁 Status

✅ Fully functional

✅ Deployed

✅ Persistent

✅ Production-ready

## 👤 Author

Vitalii Shchukin
GitHub: <https://github.com/VitaliiShc/>
