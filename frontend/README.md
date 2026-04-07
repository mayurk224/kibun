# Kibun Frontend

React-based user interface for the Kibun mood music app.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-007ACC?style=for-the-badge&logo=google&logoColor=white)

## Overview

The Kibun frontend is a modern React application built with Vite, providing a seamless user experience for mood-based music streaming. It features real-time facial expression detection using MediaPipe, an intuitive music player, user authentication flows, and a responsive design powered by TailwindCSS.

## Key Features

- **Face Expression Detection**: Real-time mood detection using MediaPipe Vision API.
- **Music Player**: Built-in audio player with playback controls.
- **Authentication UI**: Login, registration, and email verification pages.
- **Upload Interface**: Modal for uploading music and lyrics.
- **Responsive Design**: Mobile-first UI with TailwindCSS.
- **Routing**: Client-side routing with React Router.

## Architecture & Structure

```
frontend/
├── public/
├── src/
│   ├── context/
│   │   └── PlayerContext.jsx    # Music player state management
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ResendVerifyEmail.jsx
│   │   │   │   └── VerifyEmail.jsx
│   │   │   ├── services/
│   │   │   │   └── auth.api.js
│   │   │   ├── utils/
│   │   │   │   └── validation.js
│   │   │   └── auth.context.jsx
│   │   ├── faceDetect/
│   │   │   ├── components/
│   │   │   │   └── FaceExpression.jsx
│   │   │   └── utils/
│   │   │   └── utils.js
│   │   └── home/
│   │     ├── components/
│   │     │   ├── Category.jsx
│   │     │   ├── CategoryCard.jsx
│   │     │   ├── Footer.jsx
│   │     │   ├── Navbar.jsx
│   │     │   ├── Sidebar.jsx
│   │     │   ├── SidebarCard.jsx
│   │     │   └── UploadModal.jsx
│   │     ├── hooks/
│   │     │   └── useHome.js
│   │     ├── pages/
│   │     │   └── Home.jsx
│   │     └── services/
│   │       └── home.api.js
│   ├── hooks/
│   │   └── useLyrics.js
│   ├── App.jsx
│   ├── app.routes.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)

### Installation
```bash
cd frontend
npm install
```

### Running the App
```bash
npm run dev  # Development server
# or
npm run build  # Build for production
npm run preview  # Preview production build
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |
