# Kibun

A mood-based music streaming platform that uses facial expression detection to curate personalized playlists.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Overview

Kibun is a web application that analyzes users' facial expressions in real-time to detect their current mood and recommends music accordingly. Built with a modern tech stack, it features user authentication, music upload capabilities, and a responsive UI. The platform leverages MediaPipe for facial expression recognition, ensuring a personalized music experience based on emotional state.

## Key Features

- **Real-time Face Expression Detection**: Uses MediaPipe to analyze facial expressions and detect mood.
- **Music Streaming**: Stream uploaded music with a built-in player.
- **User Authentication**: Secure JWT-based authentication with email verification.
- **Music Upload**: Upload music files with automatic metadata extraction.
- **Responsive Design**: Mobile-friendly interface built with React and TailwindCSS.
- **Caching**: Redis integration for performance optimization.

## Architecture & Structure

```
kibun/
├── backend/
│   ├── config/
│   │   ├── cache.js
│   │   ├── database.js
│   │   └── imagekit.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── music.controller.js
│   │   └── upload.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── blacklist.model.js
│   │   ├── music.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── music.route.js
│   │   └── upload.route.js
│   ├── services/
│   │   └── upload.service.js
│   ├── src/
│   │   └── app.js
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── context/
│   │   │   └── PlayerContext.jsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── ProtectedRoute.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   ├── Register.jsx
│   │   │   │   │   ├── ResendVerifyEmail.jsx
│   │   │   │   │   └── VerifyEmail.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.api.js
│   │   │   │   ├── utils/
│   │   │   │   │   └── validation.js
│   │   │   │   └── auth.context.jsx
│   │   │   ├── faceDetect/
│   │   │   │   ├── components/
│   │   │   │   │   └── FaceExpression.jsx
│   │   │   │   └── utils/
│   │   │   │   └── utils.js
│   │   │   └── home/
│   │   │     ├── components/
│   │   │     │   ├── Category.jsx
│   │   │     │   ├── CategoryCard.jsx
│   │   │     │   ├── Footer.jsx
│   │   │     │   ├── Navbar.jsx
│   │   │     │   ├── Sidebar.jsx
│   │   │     │   ├── SidebarCard.jsx
│   │   │     │   └── UploadModal.jsx
│   │   │     ├── hooks/
│   │   │     │   └── useHome.js
│   │   │     ├── pages/
│   │   │     │   └── Home.jsx
│   │   │     └── services/
│   │   │       └── home.api.js
│   │   ├── hooks/
│   │   │   └── useLyrics.js
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Redis

### Installation
```bash
git clone <repository-url>
cd kibun
cd backend && npm install
cd ../frontend && npm install
```

### Running the App
```bash
# Backend
cd backend
npm run dev

# Frontend (in a new terminal)
cd frontend
npm run dev
```

## Environment Variables

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/kibun |
| REDIS_HOST | Redis host | localhost |
| REDIS_PORT | Redis port | 6379 |
| REDIS_PASSWORD | Redis password | yourpassword |
| JWT_SECRET | JWT secret key | yourjwtsecret |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key | yourpublickey |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key | yourprivatekey |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint | https://ik.imagekit.io/yourid |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |