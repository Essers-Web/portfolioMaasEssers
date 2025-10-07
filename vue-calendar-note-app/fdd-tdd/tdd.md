# 📗 Technical Design Document (TDD)

## 1. Architecture
- **Framework**: Vue.js 3 (Composition API).
- **Bundler/Dev Tool**: Vite.
- **State Management**: Pinia (lightweight and works well with Vue 3).
- **Database**: IndexedDB (with [idb library](https://github.com/jakearchibald/idb)).
- **Routing**: Vue Router 4.
- **Styling**: TailwindCSS (optional but recommended for fast styling).

The app is built as an **offline-first PWA** (Progressive Web App).  
All data is stored locally on the device using IndexedDB.

---

