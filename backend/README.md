# Kibun Backend

RESTful API server for the Kibun music streaming platform.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Overview

The Kibun backend is a Node.js/Express API server that handles user authentication, music management, file uploads, and integrates with MongoDB for data persistence and Redis for caching. It provides secure endpoints for the frontend, including JWT-based authentication, music streaming metadata, and media storage via ImageKit.

## Key Features

- **JWT Authentication**: Secure user login, registration, and session management.
- **Music Management**: Retrieve and manage music collections with metadata extraction.
- **File Upload**: Handle music and lyric file uploads with validation.
- **Caching**: Redis integration for improved performance.
- **Email Verification**: Nodemailer integration for user verification.
- **ImageKit Integration**: Cloud storage for media files.

## Architecture & Structure

```
backend/
├── config/
│   ├── cache.js          # Redis configuration
│   ├── database.js       # MongoDB connection
│   └── imagekit.js       # ImageKit setup
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── music.controller.js   # Music retrieval
│   └── upload.controller.js  # File upload handling
├── middlewares/
│   ├── auth.middleware.js    # JWT verification
│   └── upload.middleware.js  # Multer configuration
├── models/
│   ├── blacklist.model.js    # Token blacklist
│   ├── music.model.js        # Music schema
│   └── user.model.js         # User schema
├── routes/
│   ├── auth.route.js     # Auth endpoints
│   ├── music.route.js    # Music endpoints
│   └── upload.route.js   # Upload endpoints
├── services/
│   └── upload.service.js # Upload processing
├── src/
│   └── app.js           # Express app setup
├── package.json
├── server.js           # Entry point
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Redis

### Installation
```bash
cd backend
npm install
```

### Running the App
```bash
npm run dev  # Development with nodemon
# or
npm start    # Production
```

## Environment Variables

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
