<div align="center">

# Kibun

**Your mood. Your music. Automatically.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks_Vision-FF6F00?style=flat-square&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## Overview

Kibun (気分 — Japanese for *mood/feeling*) is a mood-aware music streaming application that uses your **webcam and real-time face expression detection** to automatically surface music that matches how you feel. Sign in, let the camera scan your expression, and Kibun filters the music library by your detected mood — happy, sad, neutral, or surprised — so you always have the perfect soundtrack.

---

## Key Features

- 🎭 **Real-Time Mood Detection** — Uses Google MediaPipe Tasks Vision to detect facial expressions (happy, sad, neutral, surprised) from the live webcam feed and filters music accordingly.
- 🎵 **Full-Featured Audio Player** — Persistent player context with play/pause, next/prev navigation, seek, volume control, and automatic playlist progression.
- 🎤 **Synced Lyrics** — Fetches timed lyrics and highlights the active line in sync with the current playback position.
- 🔐 **JWT Authentication** — Secure sign-up / sign-in flow with email verification, protected routes, and a clean persistent auth context.
- 🗂️ **Mood-Based Browsing** — Category sidebar and filter chips that let users manually or automatically browse music by mood tag.
- ☁️ **Vercel-Ready** — Pre-configured `vercel.json` for seamless SPA deployment.

---

## Architecture & Structure

```
frontend/
├── public/                  # Static assets (logo, icons)
├── src/
│   ├── main.jsx             # App entry point
│   ├── App.jsx              # Root component (providers + router)
│   ├── app.routes.jsx       # Route definitions (protected + public)
│   ├── index.css            # Global design tokens & base styles
│   ├── context/
│   │   └── PlayerContext.jsx   # Global audio player state
│   ├── hooks/
│   │   └── useLyrics.js        # Timed lyrics sync hook
│   └── features/
│       ├── auth/
│       │   ├── auth.context.jsx
│       │   ├── components/     # ProtectedRoute
│       │   ├── hooks/          # useAuth
│       │   ├── pages/          # Login.jsx, Register.jsx
│       │   └── services/       # auth.api.js
│       ├── faceDetect/
│       │   ├── components/     # FaceExpression.jsx
│       │   └── utils/          # MediaPipe init & detect helpers
│       └── home/
│           ├── components/     # Navbar, Sidebar, Footer, Category, …
│           ├── hooks/          # useHome
│           ├── pages/          # Home.jsx
│           └── services/       # home.api.js
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- A running instance of the Kibun backend API

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kibun.git
cd kibun/frontend

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

| Variable        | Description                                 | Example                      |
| --------------- | ------------------------------------------- | ---------------------------- |
| `VITE_API_URL`  | Base URL of the Kibun backend REST API      | `http://localhost:3000`      |

> **Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client bundle.
