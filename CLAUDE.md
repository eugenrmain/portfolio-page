# Portfolio page (Next.js 16, static export)

Project memory: read ai/CONTEXT.md first; see ai/ for decisions and gotchas.

Next.js here is newer than Claude's training data: APIs, conventions and file structure may differ.
Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and follow its deprecation notices.

- Package scripts: `dev` (port 5173), `build` (static export to `out/`), `lint`, `typecheck`, `format`.
- Run `typecheck` and `lint` before calling a change done.
