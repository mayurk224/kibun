# Kibun — Backend

> A mood-aware music platform API. Authenticated users can upload songs with lyrics and have playlists curated based on their detected emotional state.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-ioredis-DC382D?style=flat-square&logo=redis&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-Cloud_Storage-009BDE?style=flat-square&logo=imagekit&logoColor=white)

---

## Overview

Kibun's backend is a RESTful API built with **Express 5** and **MongoDB**. It powers a mood-based music experience: users register, sign in, and upload MP3 tracks along with `.lrc` lyric files. The server automatically extracts ID3 metadata (title, artist, duration, album art) from the audio, stores all assets in **ImageKit**, and tags each track with a mood. This mood metadata drives playlist recommendations on the frontend. Token invalidation on logout is handled via a **Redis** blacklist for stateless, scalable session management.

---

## Key Features

- **JWT Authentication** — Secure sign-up, sign-in, and logout with HTTP-only cookies (7-day expiry). Unverified users are blocked from signing in.
- **Token Blacklisting** — Logged-out tokens are stored in Redis, preventing reuse after logout.
- **Mood-Tagged Music Upload** — Authenticated users upload `.mp3` + `.lrc` pairs with an associated mood label.
- **Automatic Metadata Extraction** — The server uses `music-metadata` to extract title, artist, duration, and embedded album art from the uploaded MP3.
- **Cloud Asset Storage** — Audio files, lyric files, and poster images are uploaded concurrently to **ImageKit**, organized by mood folder.
- **Email Verification** — New accounts are verified via email (Brevo SMTP / Nodemailer) before login is permitted.

---

## Architecture & Structure

```
backend/
├── server.js               # Entry point — connects DB, starts server
├── package.json
├── .env                    # Environment configuration (do not commit)
│
├── src/
│   └── app.js              # Express app setup, CORS, route mounting
│
├── config/
│   ├── database.js         # MongoDB connection (Mongoose)
│   ├── cache.js            # Redis client (ioredis)
│   └── imagekit.js         # ImageKit SDK config
│
├── routes/
│   ├── auth.route.js       # /api/auth
│   ├── upload.route.js     # /api/upload
│   └── music.route.js      # /api/music
│
├── controllers/
│   ├── auth.controller.js  # signUp, signIn, logout, getMe
│   ├── upload.controller.js
│   └── music.controller.js
│
├── services/
│   └── upload.service.js   # Concurrent ImageKit uploads
│
├── middlewares/
│   ├── auth.middleware.js   # JWT verification + blacklist check
│   └── upload.middleware.js # Multer config + request validation
│
└── models/
    ├── user.model.js
    ├── music.model.js
    └── blacklist.model.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A running [MongoDB](https://www.mongodb.com/) instance (or Atlas URI)
- A [Redis](https://redis.io/) instance (or Redis Cloud)
- An [ImageKit](https://imagekit.io/) account
- A [Brevo](https://www.brevo.com/) (formerly Sendinblue) SMTP account

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd kibun/backend

# Install dependencies
npm install
```

### Running the App

```bash
# Development (with hot-reload via nodemon)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3000` by default.

---

## API Endpoints

| Method | Endpoint            | Auth Required | Description                        |
|--------|---------------------|:-------------:|------------------------------------|
| `POST` | `/api/auth/sign-up` | No            | Register a new user                |
| `POST` | `/api/auth/sign-in` | No            | Sign in and receive a session cookie |
| `POST` | `/api/auth/logout`  | No            | Invalidate session token via Redis |
| `GET`  | `/api/auth/get-me`  | Yes           | Get the currently authenticated user |
| `POST` | `/api/upload`       | Yes           | Upload MP3 + LRC file with mood tag |
| `GET`  | `/api/music`        | No            | Fetch music catalog                |

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

| Variable               | Description                                              |
|------------------------|----------------------------------------------------------|
| `PORT`                 | Port for the Express server (default: `3000`)            |
| `MONGO_URI`            | MongoDB connection string                                |
| `JWT_SECRET`           | Secret key used to sign JWT tokens                       |
| `FRONTEND_URL`         | Allowed CORS origin for the frontend (e.g. `http://localhost:5173`) |
| `REDIS_HOST`           | Redis server hostname                                    |
| `REDIS_PORT`           | Redis server port                                        |
| `REDIS_PASSWORD`       | Redis server password                                    |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key                                 |
| `IMAGEKIT_PUBLIC_KEY`  | ImageKit public API key                                  |
| `IMAGEKIT_URL_ENDPOINT`| ImageKit URL endpoint (e.g. `https://ik.imagekit.io/xxxxx`) |
| `BREVO_HOST`           | Brevo SMTP relay host                                    |
| `BREVO_PORT`           | Brevo SMTP port (`587` for TLS, `465` for SSL)           |
| `BREVO_EMAIL`          | Brevo sender SMTP email address                          |
| `BREVO_KEY`            | Brevo SMTP API key                                       |
| `OWNER_MAIL`           | Recipient address for admin/system notifications         |
