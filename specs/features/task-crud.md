# Task CRUD Specifications

This document details the Create, Read, Update, and Delete (CRUD) operations for tasks within the application.

## 1. Create Task
- **Endpoint:** POST /api/tasks
- **Request Body:**
  - `title`: String (required)
  - `description`: TEXT (optional)
  - `dueDate`: DATE (YYYY-MM-DD) (optional)
  - `status`: Enum (e.g., 'pending', 'completed') (default: 'pending')
- **Response:**
  - 201 Created: New task object
  - 400 Bad Request: Invalid input

## 2. Read Tasks
### 2.1 Get All Tasks
- **Endpoint:** GET /api/tasks
- **Query Parameters:**
  - `status`: Filter by task status (optional)
  - `dueDate`: Filter by due date (optional)
- **Response:**
  - 200 OK: Array of task objects

### 2.2 Get Task by ID
- **Endpoint:** GET /api/tasks/{id}
- **Response:**
  - 200 OK: Task object
  - 404 Not Found: Task with given ID not found

## 3. Update Task
- **Endpoint:** PATCH /api/tasks/{id}
- **Request Body:** (Partial update allowed)
  - `title`: String (optional)
  - `description`: TEXT (optional)
  - `dueDate`: DATE (YYYY-MM-DD) (optional)
  - `status`: Enum (e.g., 'pending', 'completed') (optional)
- **Response:**
  - 200 OK: Updated task object
  - 400 Bad Request: Invalid input
  - 404 Not Found: Task with given ID not found

## 4. Delete Task
- **Endpoint:** DELETE /api/tasks/{id}
- **Response:**
  - 204 No Content: Task successfully deleted
  - 404 Not Found: Task with given ID not found
