# Database Schema Specification

This document defines the database schema for the application, focusing on tables required for Phase II.

## 1. Users Table
- **Table Name:** `users`
- **Columns:**
  - `id`: UUID (Primary Key)
  - `username`: VARCHAR(255) (Unique, Not Null)
  - `email`: VARCHAR(255) (Unique, Not Null)
  - `password_hash`: VARCHAR(255) (Not Null)
  - `created_at`: TIMESTAMP (Default: CURRENT_TIMESTAMP)
  - `updated_at`: TIMESTAMP (Default: CURRENT_TIMESTAMP, On Update: CURRENT_TIMESTAMP)

## 2. Tasks Table
- **Table Name:** `tasks`
- **Columns:**
  - `id`: UUID (Primary Key)
  - `user_id`: UUID (Foreign Key references `users.id`, Not Null)
  - `title`: VARCHAR(255) (Not Null)
  - `description`: TEXT (Optional)
  - `due_date`: DATE (Optional)
  - `status`: ENUM('pending', 'completed') (Default: 'pending', Not Null)
  - `created_at`: TIMESTAMP (Default: CURRENT_TIMESTAMP)
  - `updated_at`: TIMESTAMP (Default: CURRENT_TIMESTAMP, On Update: CURRENT_TIMESTAMP)

## Relationships
- A user can have many tasks.
- Each task belongs to one user.

## Future Considerations (Out of Scope for Phase II)
- Indexes for performance optimization.
- Additional tables for categories, tags, or shared tasks.
