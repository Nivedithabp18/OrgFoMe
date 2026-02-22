# Niveditha — Personal Organizer

A minimal, beautiful personal organizer built with React.

## Features
- 📄 **Documents** — Store PDFs and images with custom names
- 📚 **Subjects** — Semester folders with files and notes
- 💼 **Projects** — Project workspace with files and notes
- 🔗 **Links & Details** — Save links + a password vault
- ✅ **To-Do List** — Tasks with due dates and overdue alerts
- ⚙️ **Settings** — 4 themes (Light, Dark, Rose, Sage) + email reminders

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.js                    ← Main app shell & routing
├── index.js                  ← React entry point
├── components/
│   ├── Icon.js               ← All SVG icons
│   ├── UI.js                 ← Shared UI primitives (Modal, Btn, Input…)
│   └── Sidebar.js            ← Desktop sidebar + mobile header nav
├── sections/
│   ├── DocumentsSection.js
│   ├── SubjectsSection.js
│   ├── ProjectsSection.js
│   ├── LinksSection.js
│   ├── TodoSection.js
│   └── SettingsSection.js
└── utils/
    ├── storage.js            ← localStorage wrapper
    ├── themes.js             ← Theme definitions & accent colours
    └── useIsMobile.js        ← Responsive hook (≤640px = mobile)
```

## Notes
- All data is stored in **localStorage** — no backend or account needed.
- Email reminders are saved locally. To actually send emails, integrate a service like EmailJS or a backend cron job.
- The app is fully responsive: sidebar on desktop/tablet, icon nav bar on mobile.
