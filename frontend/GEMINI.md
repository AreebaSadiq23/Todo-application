# Gemini Agent Guidelines for Frontend (Phase II)

This document outlines the specific guidelines for the Gemini CLI autonomous agent when interacting with the frontend component during Phase II of the project.

## 1. Coding Rules (Specification Phase)

*   **Component-Based Architecture:** Specifications should promote a clear component hierarchy and reusable UI components.
*   **React Best Practices:** Specifications should align with idiomatic React practices (e.g., functional components, hooks, props for data flow).
*   **TypeScript Usage:** All frontend data structures and interfaces must be specified using TypeScript types to ensure type safety.
*   **Accessibility (Basic):** Basic accessibility considerations should be included in UI specifications (e.g., semantic HTML elements, clear labels).
*   **Readability:** Specifications for UI logic and component structure must be clear, concise, and easy to understand.

## 2. Tech Stack Constraints (Specification Phase)

*   **Framework:** All frontend specifications must be tailored for **Next.js**. This includes considerations for page-based routing, data fetching mechanisms (e.g., `getServerSideProps`, `getStaticProps`, client-side fetching), and API route integration (if used for client-side API calls).
*   **Styling:** Specifications should be flexible regarding styling, but assume a modern CSS-in-JS solution or utility-first CSS framework (e.g., Tailwind CSS, Styled Components) for consistency.
*   **State Management:** Specifications should consider a suitable state management solution for React (e.g., React Context, Zustand, Redux Toolkit).

## 3. Security Expectations (Specification Phase)

*   **API Key/Sensitive Data Handling:** Specifications must ensure that no sensitive API keys or credentials are hardcoded or directly exposed in the frontend. All sensitive operations should route through the backend.
*   **CORS:** Specifications should acknowledge and implicitly account for Cross-Origin Resource Sharing (CORS) when designing API interactions.
*   **XSS Prevention:** Specifications for rendering user-generated content should include measures to prevent Cross-Site Scripting (XSS) attacks (e.g., proper escaping).
*   **Session Management:** Specifications should detail how JWTs obtained from the backend will be securely stored and managed on the client-side (e.g., HttpOnly cookies, local storage considerations).

## 4. Phase II Limitations (Specification Phase)

*   **Focus on Core UI:** The primary focus for frontend specifications in Phase II is on implementing the essential user interface for task management (CRUD) and user authentication.
*   **Basic Responsiveness:** Specifications should include basic responsiveness for common viewport sizes, but comprehensive cross-browser and device testing beyond major breakpoints is out of scope.
*   **No Advanced UI/UX:** Complex animations, intricate user interactions, or highly polished custom designs are out of scope for Phase II specifications. The emphasis is on functionality and usability.
*   **Internationalization (i18n) / Localization (l10n):** These features are not within the scope of Phase II specifications.
*   **Performance Optimization:** While efficient component rendering is desired, advanced frontend performance optimizations (e.g., complex lazy loading, bundle analysis) are beyond Phase II.
