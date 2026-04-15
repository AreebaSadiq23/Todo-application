---
title: Todo API
emoji: 📝
colorFrom: green
colorTo: green
sdk: docker
pinned: false
---

# Todo Application API

A FastAPI backend for a todo application with authentication.

## Endpoints

- `GET /` - Welcome message
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/tasks/` - Get all tasks
- `POST /api/tasks/` - Create task
- `PATCH /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (optional, defaults to SQLite)
