# 📅 Wall Calendar & Notes Application

![Project Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg)
![Frontend](https://img.shields.io/badge/Frontend-React_19-blue.svg)
![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-06B6D4.svg)

A beautifully sculpted, purely frontend React application designed to mimic a physical hanging wall calendar. No fancy api and Databases used here , it is purly built with the event handelers and local storage integration 

**Repository Link:** [https://github.com/Hardikdhoot121/calender_to_do_list](https://github.com/Hardikdhoot121/calender_to_do_list)

---

## ✨ Features

* **Authentic Wall Calendar UI:** Visually pleasing side-by-side design featuring an immersive Indian scenery landscape alongside a dynamically rendered calendar grid.
* **Persistent Daily Notes:** Click on any specific day to open the dynamically rendered "Sticky Note" panel beneath the calendar. Write your to-do lists or notes, click save, and it will persist indefinitely into your browser.
* **Automatic Highlighting Engine:**
  * Displays a gorgeous **Yellow Solid Ring** to track the current real-world date.
  * Displays a **Deep Teal Indicator** for any date that contains a saved note.
  * *Paints a blended gradient* if the current date also has a saved note!
* **Quick-Jump Navigation:** If you lose your place while exploring previous or future months, a context-aware **"Today"** button elegantly fades in. One click instantly drops you back onto the current month.
* **100% Serverless:** Requires absolutely zero backend setup or external databases. Data is persistently synchronized using a custom React Hook binding strictly to `window.localStorage`.
* **Fully Responsive:** Beautifully gracefully downgrades from a dual-pane landscape view into a cleanly stacked mobile view.

---

## 🚀 Quick Start & Installation

Because this depends solely on Vite and React frontend tooling, it can be running in seconds.

### 1. Clone the repository
```bash
git clone https://github.com/Hardikdhoot121/calender_to_do_list.git
cd calender_to_do_list
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the Vite development server
```bash
npm run dev
```

Navigate to `http://localhost:5173/` in your browser.

---

## 🛠️ Architecture & Technical Choices

### 1. Vite over Create-React-App
Vite was chosen specifically due to its instantaneous Hot Module Replacement (HMR) and insanely fast cold boot times compared to Webpack/CRA, leading to a drastically improved developer experience.

### 2. Native JS Date Manipulation
Instead of blindly importing heavy dependencies like `moment.js` or even `date-fns` for basic grid calculations, we engineered a custom `dateUtils.js` module. It seamlessly handles padding for preceding/trailing dates and grid alignment using 100% Vanilla JavaScript. By avoiding excess packages, the bundle size remains feather-light and the codebase proves to be easily modifiable.

### 3. Tailwind CSS v4 (No Component Libraries)
Tailwind was selected precisely to craft a completely bespoke interface that isn't pigeonholed into feeling like a standard Bootstrap or MaterialUI template. Drop-shadows, bespoke hover translate animations, absolute positioning overlays, gradient blending, and custom media-queries were entirely hand-coded directly in the component DOM without wrangling standard CSS modules.

### 4. Custom LocalStorage Hook
Instead of relying on external state managers (e.g., Redux or Zustand), this project scales easily via a heavily optimized `useLocalStorage` React hook. By wrapping native `useState` functionality, any mutation to calendar notes or selected dates instantaneously triggers a React component re-render while simultaneously safely rewriting `window.localStorage` so data survives hot-reloads.

---

## 📁 Directory Structure
```
src/
├── App.jsx             # The root wrapper and landscape image coordinator
├── index.css           # Global Tailwind derivatives and layout resets
├── hooks/
│   └── useLocalStorage.js # Custom hook mediating internal state with LocalStorage
├── utils/
│   └── dateUtils.js    # Vanilla JS mathematical handlers for mapping a 7x6 calendar
└── components/
    ├── Calendar.jsx    # The core engine mediating UI and Date algorithms
    ├── DayCell.jsx     # Pure UI node controlling highlight detection per individual day
    └── NotesPanel.jsx  # Context-aware memoization panel for saved data
```
