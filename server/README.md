# Bazaario Backend (scaffold)

This folder contains a minimal TypeScript + Express scaffold following an MVC-style layout.

Structure:

- src/
  - config/
  - controllers/
  - models/
  - routes/
  - middlewares/
  - utils/
- app.ts — express app
- server.ts — bootstrap/start

How to run (from `server/`):

```bash
npm install
npm run dev   # development with ts-node-dev
npm run build # compile to dist
npm start     # run compiled dist
```

Notes: No business logic added yet; add controllers, models, and routes as needed.
