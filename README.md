# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project brief email delivery

The project brief form posts to the Vercel Function at `/api/brief`, which sends the details through Resend. Configure these variables in the Vercel project settings before deploying:

- `RESEND_API_KEY` — a private Resend API key. Keep it server-side; never prefix it with `VITE_`.
- `RESEND_FROM_EMAIL` — a sender address on a domain verified with Resend, for example `CodeInCave <briefs@your-domain.com>`.
- `CONTACT_TO_EMAIL` — destination inbox. It defaults to `ngrethesh@gmail.com`.

The visitor's address is included as `Reply-To`, so replies go back to the person who submitted the brief.

For phone testing against the local Vite server, copy `.env.example` to `.env.local`, fill in the same values, and start Vite with `npm run dev -- --host 0.0.0.0`. The Vite dev middleware routes `/api/brief` through the same server-side handler. `.env.local` is ignored by Git.
