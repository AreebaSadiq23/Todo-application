# REST Endpoints Specification

This document consolidates all REST API endpoints for the application.

## 1. Authentication Endpoints
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Authenticate a user and return a JWT token.
- **POST /api/auth/logout:** Invalidate user session/token (client-side implementation primarily).

## 2. Task Management Endpoints
- **POST /api/tasks:** Create a new task.
- **GET /api/tasks:** Retrieve all tasks (with optional filtering).
- **GET /api/tasks/{id}:** Retrieve a single task by ID.
- **PATCH /api/tasks/{id}:** Update an existing task by ID.
- **DELETE /api/tasks/{id}:** Delete a task by ID.

## 3. Future Considerations (Out of Scope for Phase II)
- User profile management endpoints.
- Category or tag management for tasks.
- Search functionality.
