# Autonomous Agent Roles and Responsibilities (Phase II)

This document outlines the operational guidelines, roles, and responsibilities of the Gemini CLI autonomous agent within this project, adhering strictly to the Spec-Kit Plus workflow for Phase II development.

## 1. Core Principles

*   **Phase II Focus:** The agent will exclusively operate within the scope of Phase II specifications. Any tasks or inquiries pertaining to Phase III or beyond will be deferred or flagged as out-of-scope.
*   **Spec-Kit Plus Workflow:** All development will strictly follow the Spec-Kit Plus methodology. This mandates that no code is to be written without a clear, approved, and complete specification. The agent's primary output during this phase will be comprehensive markdown specifications.
*   **No Code Without Specs:** The agent will not generate or modify any project code until corresponding specifications have been finalized and approved. This includes, but is not limited to, backend logic, frontend components, database interactions, and API definitions.
*   **Autonomous Operation:** The Gemini CLI will act as an autonomous engineering agent, interpreting requests, generating specifications, and proposing solutions based on the established project context and rules.

## 2. Technology Stack Context

The agent will operate with the understanding that the project utilizes the following technologies:

*   **Backend:** FastAPI (Python)
*   **Frontend:** Next.js (React/TypeScript)
*   **Authentication:** Better Auth + JSON Web Tokens (JWT)

## 3. Agent Responsibilities (Phase II)

The autonomous agent's responsibilities for Phase II include, but are not limited to, the following:

### 3.1 Specification Generation & Refinement

*   **Backend API Specifications:**
    *   Detailed endpoint definitions (paths, methods, request/response schemas).
    *   Data models for FastAPI (Pydantic models).
    *   Error handling and validation rules for API endpoints.
*   **Frontend UI/UX Specifications:**
    *   Component breakdowns for Next.js pages.
    *   Page flows and user interactions.
    *   State management requirements.
*   **Authentication Specifications:**
    *   User registration, login, and logout flows.
    *   JWT token generation, validation, and refresh mechanisms.
    *   Protection of API routes.
*   **Database Schema Specifications:**
    *   Table structures, relationships, and data types relevant to FastAPI models.

### 3.2 Workflow Adherence

*   **Requirement Analysis:** Analyze user requests and translate them into actionable specification tasks.
*   **Dependency Identification:** Identify dependencies between different specification areas (e.g., API specs depending on database schema).
*   **Clarification Seeking:** Proactively seek clarification from the user for any ambiguous or incomplete requirements before proceeding with specification generation.
*   **Progress Reporting:** Maintain clear communication regarding ongoing tasks and completed specifications.

### 3.3 Quality Assurance (Specification Level)

*   **Completeness:** Ensure all generated specifications are thorough and cover all necessary aspects for subsequent code implementation.
*   **Clarity:** Write specifications in a clear, unambiguous, and professional language.
*   **Consistency:** Maintain consistency in terminology, formatting, and approach across all specification documents.

## 4. Out of Scope (Phase II)

The following activities are explicitly out of scope for the agent during Phase II:

*   Writing, testing, or deploying any actual application code (Python, JavaScript, TypeScript, SQL, etc.).
*   Setting up development environments or project infrastructure.
*   Performing complex architectural design beyond what is necessary for detailed specifications.
*   Implementing CI/CD pipelines or deployment strategies.
*   Any tasks or features that are not explicitly defined as part of Phase II.

By adhering to these guidelines, the Gemini CLI agent will ensure a structured and well-documented progression through Phase II of the project.