# User Interface (UI) Pages Specification

This document outlines the key user interface pages for Phase II of the application.

## 1. Landing Page / Home Page
- **Purpose:** Provide an overview of the application and direct users to login or registration.
- **Components:**
  - Application title/logo.
  - Brief description of features.
  - "Login" button/link.
  - "Register" button/link.

## 2. Registration Page
- **Purpose:** Allow new users to create an account.
- **Components:**
  - Form fields for username, email, password, confirm password.
  - "Register" button.
  - Link to "Login" page.
  - Password strength indicator (optional for Phase II, but good to note).

## 3. Login Page
- **Purpose:** Allow existing users to log in to their account.
- **Components:**
  - Form fields for username/email and password.
  - "Login" button.
  - Link to "Registration" page.
  - "Forgot Password" link (out of scope for Phase II, but a placeholder).

## 4. Task Dashboard Page
- **Purpose:** Display a list of the authenticated user's tasks.
- **Components:**
  - Header with user's name and a "Logout" button.
  - "Add New Task" button.
  - List of tasks, each showing:
    - Title
    - Description (truncated, with option to expand)
    - Due Date
    - Status (e.g., checkbox for completed)
    - "Edit" button for each task.
    - "Delete" button for each task.
  - Filtering/Sorting options (e.g., by status, due date) - basic for Phase II.

## 5. Create/Edit Task Page (Modal or Separate Page)
- **Purpose:** Allow users to create a new task or edit an existing one.
- **Components:**
  - Form fields for task title, description, due date, status.
  - "Save" button.
  - "Cancel" button.

## Navigation
- Clear navigation between Login, Register, and Task Dashboard pages.
- Access to Task Dashboard only after successful login.
