# MERN Blog App

A full-stack blogging application built with the MERN (MongoDB, Express, React, Node.js) stack. Features user authentication, post management, commenting, and image uploads via Cloudinary.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [API Endpoints (Backend)](#api-endpoints-backend)
- [Troubleshooting](#troubleshooting)

---

## Features

✨ **Core Features**
- 🔐 User authentication with JWT + cookies
- 📝 Create, read, update, delete (CRUD) blog posts
- 💬 Comment system on posts
- 🖼️ Image uploads via Cloudinary
- 🎨 Dark/light theme toggle
- 🔍 Search and filter posts by category
- 👥 Admin dashboard for user & post management
- 📱 Responsive design with Tailwind CSS

---

## Tech Stack

**Frontend (`Client/`)**
- React 19 with Vite (fast build tool)
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Firebase for authentication

**Backend (`Server/`)**
- Node.js + Express
- MongoDB with Mongoose ODM
- JWT for token-based auth
- Multer for file uploads
- Cloudinary SDK for image storage
- CORS for cross-origin requests
- Bcryptjs for password hashing

---

## Project Structure

```
Mern-Blog-App/
├── Client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── Components/        # Reusable React components
│   │   ├── Pages/             # Page components (Home, Dashboard, etc.)
│   │   ├── Redux/             # Redux store and slices
│   │   ├── App.jsx
│   │   ├── main.jsx           # Entry point
│   │   ├── firebase.js        # Firebase config
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── Server/                    # Express backend
│   ├── Controllers/           # Business logic
│   ├── Routes/                # API routes
│   ├── Models/                # MongoDB schemas
│   ├── Middleware/            # Auth, error handling
│   ├── Database/
│   │   └── config.js          # MongoDB connection
│   ├── index.js               # Server entry point
│   ├── cloudinary.js          # Cloudinary config
│   ├── package.json
│   └── uploads/               # Local upload folder (temp)
│
└── README.md                  # This file
```

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16+) and **npm** (v8+)
- **MongoDB** (Atlas cloud or local instance)
- **Cloudinary account** (for image uploads)
- **Git**

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ChandraBose-11/Mern-Stack-Blog-App.git
cd Mern-Stack-Blog-App
```

### 2. Set Up Backend (`Server/`)

```bash
cd Server
npm install
```

Create a `.env` file in `Server/`:
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/blog
JWT_SECRET_KEY=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
COOKIE_EXPIRES_IN=7
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Set Up Frontend (`Client/`)

```bash
cd ../Client
npm install
```

Create a `.env` file in `Client/`:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## Environment Variables

### Backend (`Server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/blog` |
| `JWT_SECRET_KEY` | Secret key for JWT signing | `your_secret_key_123` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `dxxxxxx` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `xxxxxx` |
| `COOKIE_EXPIRES_IN` | Cookie expiry in days | `7` |
| `PORT` | Server port (optional) | `5000` |
| `CLIENT_URL` | Frontend origin (for CORS) | `http://localhost:5173` or `https://your-site.netlify.app` |

### Frontend (`Client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` or `https://your-backend.onrender.com` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | (from Firebase console) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | (from Firebase console) |

---

## Running Locally

### Start Backend

```bash
cd Server
npm run dev
```

Server runs on `http://localhost:5000`

### Start Frontend (in a new terminal)

```bash
cd Client
npm run dev
```

Frontend runs on `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## Building for Production

### Build Frontend

```bash
cd Client
npm run build
```

Outputs to `Client/dist/` (ready for Netlify)

### Backend Production Build

Backend doesn't require a separate build step. The source code runs directly with Node.

---

## Deployment

### Backend on Render

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Root Directory:** `Server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start`

3. **Add Environment Variables**
   - In Render dashboard → Service → Environment
   - Add all variables from your `Server/.env`:
     - `MONGODB_URL` — MongoDB Atlas connection string
     - `JWT_SECRET_KEY` — Your JWT secret
     - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials
     - `COOKIE_EXPIRES_IN` — Cookie expiry (e.g., `7`)
     - `CLIENT_URL` — **Set to your Netlify site URL** (e.g., `https://your-site.netlify.app`)

4. **Deploy**
   - Click "Create Web Service"
   - Render will install dependencies and start your app
   - Note the generated URL (e.g., `https://your-backend.onrender.com`)

### Frontend on Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build**
   - **Base directory:** `Client`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Add Environment Variables**
   - In Netlify site settings → Build & Deploy → Environment
   - Add:
     - `VITE_API_URL` — Your Render backend URL (e.g., `https://your-backend.onrender.com`)
     - All `VITE_FIREBASE_*` variables from your Firebase console

4. **Deploy**
   - Click "Deploy site"
   - Your app is live at the provided Netlify URL
   - Update `CLIENT_URL` on Render to point to your Netlify URL

---

## API Endpoints (Backend)

### Authentication
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/signin` — Login user
- `POST /api/auth/signout` — Logout user

### Users
- `GET /api/user/:id` — Get user profile
- `PUT /api/user/update/:id` — Update user profile
- `GET /api/user/getusers` — Get all users (admin only)
- `DELETE /api/user/delete/:id` — Delete user (admin only)

### Posts
- `GET /api/post/getposts` — Get all posts with pagination/search
- `GET /api/post/:id` — Get a single post by ID
- `POST /api/post/create` — Create a new post
- `PUT /api/post/updatepost/:id` — Update a post
- `DELETE /api/post/deletepost/:id` — Delete a post

### Comments
- `POST /api/comment/create` — Create a comment on a post
- `GET /api/comment/getPostComments/:postId` — Get all comments for a post
- `DELETE /api/comment/deletecomment/:id` — Delete a comment

---

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGODB_URL` is correct
- In MongoDB Atlas, go to Security → Network Access
- Add `0.0.0.0/0` (or your IP) to allow connections
- Check cluster is running and database name is correct

### CORS Errors in Browser
- Backend CORS is configured to accept only the `CLIENT_URL` environment variable
- Ensure `CLIENT_URL` on Render matches your Netlify site origin (include `https://`)
- Example: `https://your-blog.netlify.app` (not `http://`, use `https://`)

### Cloudinary Upload Fails
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are correct
- Log in to your Cloudinary dashboard and confirm credentials
- Check upload settings and quota

### Frontend API Calls Fail
- Verify `VITE_API_URL` is set to the correct backend URL
- Open browser DevTools (F12) → Console for CORS/network errors
- Ensure backend is running and responds to health checks
- Try hitting `https://your-backend.onrender.com/` in your browser

### Build Errors
- Delete `node_modules` and `package-lock.json`: `rm -r node_modules package-lock.json`
- Reinstall: `npm install`
- Check Node version: `node --version` (should be v16+)

### Render Backend Won't Start
- Check Render logs in the dashboard
- Verify `PORT` env var is not conflicting (Render assigns one automatically)
- Ensure `npm run start` works locally: `cd Server && npm run start`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Contact & Support

For issues, questions, or feature requests:
- **GitHub Issues:** [Open an issue](https://github.com/ChandraBose-11/Mern-Stack-Blog-App/issues)
- **Email:** (add your contact email if needed)

---

**Happy blogging! 🚀**
