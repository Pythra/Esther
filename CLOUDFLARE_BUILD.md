# Cloudflare Pages build

This app is a **static SPA** (Vite 5 + React). Use a plain static build on Cloudflare:

- **Framework preset:** None  
- **Build command:** `npm run build`  
- **Build output directory:** `dist`  
- **Root directory:** `frontend` (if the repo root is the monorepo)

Do **not** use the "Vite" or "React (Vite)" framework preset; it injects `@cloudflare/vite-plugin`, which requires Vite 6+ and will break the build.
