# Online Blog App

This is a simple online blogging application built with React, Node.js, MongoDB, and Bootstrap CSS.

## Project structure

- `backend/` - Express API server, MongoDB database connection, blog routes.
- `frontend/` - React app built with Vite, Bootstrap styling, axios API client.

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or connection string available

## Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

3. Configure MongoDB connection:

- Copy `backend/.env.example` to `backend/.env`
- Update `MONGO_URI` if needed

4. Start the backend server:

```bash
cd backend
npm run dev
```

5. Start the React frontend:

```bash
cd frontend
npm run dev
```

6. Open the frontend URL shown in the terminal (usually `http://localhost:5173`).

## API Endpoints

- `GET /api/blogs` - list all blogs
- `POST /api/blogs` - create a blog
- `PUT /api/blogs/:id` - update a blog
- `DELETE /api/blogs/:id` - delete a blog

## Notes

- The frontend calls the backend at `http://localhost:5000`.
- Ensure MongoDB is running and reachable before starting the backend.
