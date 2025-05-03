# 📝 Smart Notes - Backend API

This is the backend server for the **Smart Notes** application. It provides a RESTful API for user authentication, secure note storage, and retrieval. The backend is built using **Node.js**, **Express**, **MongoDB**, and uses **JWT** for authentication.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- CRUD operations for notes
- Tag support for filtering and organizing
- CORS-enabled for frontend interaction
- Secure password hashing with bcrypt

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**
- **CORS**

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and set the following variables:

PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-very-secret-key
OPENAI_API_KEY = your-OpenAI_API_KEY
CORS_ORIGIN = your-frontend-base-url

## Install Dependencies 
npm install
npm run dev

🔐 Authentication

All protected routes require a valid JWT. Include it in the request headers:

Authorization: Bearer <your-token>

