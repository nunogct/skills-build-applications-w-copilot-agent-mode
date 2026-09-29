# Octofit Tracker frontend

React 19 presentation tier for Octofit Tracker, built with Vite, React Router, and Bootstrap.

## Run locally

Create `octofit-tracker/frontend/.env.local` and define `VITE_CODESPACE_NAME` with your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to call the API at `https://<codespace-name>-8000.app.github.dev`. Restart the Vite dev server after changing environment variables.

When `VITE_CODESPACE_NAME` is unset or blank, the frontend falls back to `http://localhost:8000`. Ensure the backend is running on port 8000 in that case.

Run the presentation tier on port 5173:

```bash
npm run dev
```

The app provides routes for athletes, teams, activities, the leaderboard, and workouts. Collection views accept array responses or paginated responses with `results`, `data`, or `items` arrays.
