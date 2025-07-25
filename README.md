# NextPlayInc_WorkSample

This work sample demonstrates my full-stack contributions at **Next Play Inc.**, focusing on user authentication, profile handling, and frontend form workflows. The project was built using **React (with TypeScript)** for the frontend and **Node.js/Express** for the backend, structured with clean modular architecture.

---

## Tech Stack

- **Frontend:** React, TypeScript, Figma, CSS Modules
- **Backend:** Node.js, Express.js
- **API Handling:** RESTful services with centralized `api.ts`
- **Authentication:** JWT-based login + security pages
- **Dev Tools:** ESLint, Prettier, Webpack, Nx monorepo

---

## Key Folder Overview

### `client/src/pages/`
Frontend pages built in React. Examples include:
- `LoginForm/`, `SignupForm/`, `ForgotPassword/`, `ResetPassword/`: user access flows
- `EmailVerification/`: email confirmation logic
- `CardGame/`: a simple interactive UI component for engagement

### `client/lib/user/`
- `api.ts`: Centralized API functions for all user-related backend interactions
- `types.ts`: Strongly typed interfaces for props/data to ensure type safety

### `client/src/context/`
- Shared state management via React Context (e.g., auth provider)

---

## Backend Logic

### `server/user/`
This section handles all server-side logic for the user system:
- `controllers/`: Route logic (login, register, password reset)
- `middlewares/`: Auth middleware, input validation, error handling
- `models/`: MySQL user schema
- `routes/`: API endpoints for user auth and info

---

## Note

This sample is a stripped-down and **sanitized** version of my real production work at Next Play Inc. All sensitive business logic and private data integrations have been excluded for confidentiality.