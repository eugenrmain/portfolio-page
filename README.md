# Eugen Ranow — Portfolio

A single-page portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Local development

With Bun installed, run from the project directory:

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:5173. Changes update automatically. Press Ctrl+C to stop the server.

## Checks and production build

```sh
bun run typecheck
bun run lint
bun run build
bun run preview
```

The production site is generated in `dist/`. Preview it at the address printed in the terminal.

## Project structure

- `index.html`: page title, metadata, and fonts.
- `src/main.tsx`: React entry point.
- `src/App.tsx`: portfolio section composition.
- `src/components/portfolio/`: portfolio sections.
- `src/components/ui/`: shared UI components.
- `src/assets/`: local project media.
- `src/hooks/`: shared browser behavior, including reveal animations.
- `src/styles.css`: theme and animations.
- `vite.config.ts`: build configuration and local server settings.

## GitHub Pages

The build produces static files with relative asset paths for hosting at a domain root or repository subdirectory. Publish the contents of `dist/` using a GitHub Pages deployment workflow when ready. No server runtime is required. Navigation uses section anchors within this single page.

## Project media

The Quantera card uses a local logo and demo video from `src/assets/`. Its project dialog plays the demo and includes an interactive pipeline diagram. Media imports are bundled with the production site.
