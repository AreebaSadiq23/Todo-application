# Gemini Agent Guidelines for Backend (Phase II)

This document outlines the specific guidelines for the Gemini CLI autonomous agent when interacting with the backend component during Phase II of the project.

## 1. Coding Rules (Specification Phase)

*   **Pythonic Principles:** Backend specifications for Python code should adhere to PEP 8 guidelines for style and best practices where applicable to design.
*   **Clarity and Readability:** All specified logic and data structures must be clear, concise, and easily understandable.
*   **Modularity:** Specifications should promote a modular architecture, encouraging separation of concerns (e.g., API routes, service logic, database interactions).
*   **Error Handling:** Explicitly define expected error conditions and corresponding responses for all API endpoints.

## 2. Tech Stack Constraints (Specification Phase)

*   **Framework:** All backend specifications must be tailored for **FastAPI**. This includes Pydantic models for data validation and serialization, and FastAPI's dependency injection system for request handling.
*   **Database ORM/Client:** Specifications should be compatible with a modern Python ORM or database client suitable for FastAPI integration (e.g., SQLAlchemy, Pydantic-SQLAlchemy, asyncpg).
*   **Authentication:** Specifications for authentication must align with **Better Auth and JWT** principles.

## 3. Security Expectations (Specification Phase)

*   **Input Validation:** All incoming API requests must have robust input validation defined in specifications (e.g., using Pydantic).
*   **Authentication Enforcement:** Specifications must detail how JWTs will be used to protect appropriate endpoints, including token validation and extraction of user identity.
*   **Authorization Principles:** Specifications should establish the principles for controlling access to resources based on authenticated user identity (even if granular roles are Phase III).
*   **Data Protection:** Specifications should consider data sensitivity and recommend appropriate handling (e.g., password hashing specifications).
*   **Error Disclosure:** Error responses should be generic and not expose sensitive system information.

## 4. Phase II Limitations (Specification Phase)

*   **Focus on Core CRUD & Auth:** The primary focus for backend specifications in Phase II is on implementing core CRUD operations for tasks and a functional user authentication system.
*   **No Advanced Features:** Features such as real-time updates, complex search, user profile management beyond basic registration, or third-party integrations are out of scope for Phase II specifications.
*   **Scalability & Performance:** While good design principles should be followed, extreme optimizations for scalability and performance are not primary concerns for Phase II specifications. The focus is on correctness and functionality.
*   **Monitoring & Logging:** Basic logging specifications might be included, but advanced monitoring and alerting systems are beyond Phase II.
