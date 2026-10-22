# Portfolio context

## Stack and commands

- Next.js 16.4.2, React 19.2, TypeScript 5.8, Tailwind 4.2, Motion 14.3, Radix Dialog.
- Local Next docs: `node_modules/next/dist/docs/`; read the relevant `.md` guide before unfamiliar APIs.
- `bun run dev --webpack` serves port 5173. One final `bun run build --webpack` exports to `out/`.
- Static export; use `mediaPath()` for public assets and GitHub Pages `NEXT_PUBLIC_BASE_PATH` compatibility.

## File map

- `src/app/page.tsx`: page sections. `layout.tsx`: local Geist/Geist Mono fonts and metadata.
- `src/app/kinetic.css`: visual system, responsive rules, card and dialog treatments.
- `src/lib/portfolio.ts`: profile/project facts and `mediaPath()`. `project-cards.ts`: card order and summaries.
- `project-gallery.tsx`: five accessible full-card triggers. `project-preview.tsx`: card artwork.
- `project-dialog.tsx`: lazy project dialog. `apex-preview.tsx`: actual Apex screenshot gallery and architecture.
- `public/media/apex/`: captured product images plus existing-flame icon and thin wordmark banner.
- `DESIGN.md`: detailed locked visual direction. `public/media/CREDITS.md`: asset provenance.

## Design laws

- Preserve the existing SpaceX/Linear-inspired atmosphere and self-hosted Geist typography.
- Near-black glass, ivory text, cyan/violet details, white/10 borders; preserve the global nebula exposure/vignette.
- Exactly five equal desktop cards: Quantera, Unity, Apex Desktop, Fitness, Open source.
- Phone cards place artwork above readable copy. Entire cards remain keyboard-accessible dialog triggers.
- Apex uses real Home/Compression/System captures and `apex/icon.svg` (same flame as ApexDesktop/Assets/Apex.svg) beside a Geist wordmark.
- Keep uncropped images in the gallery and a full-size link. Never replace actual product screenshots with fabricated UI.
- Existing local screenshots are preoptimized; ordinary img elements have lazy loading and meaningful alt text.
- No repeated title/eyebrow labels, redundant nested cards, fabricated results, or unstyled controls.
- Keep surrounding projects, animations, glass materials, contact information and CV links intact.

## Current state

- 2026-10-22: Apex card rebuilt for the redesigned app (new flame, Geist wordmark, fresh captures, measured <0.1% idle CPU in copy).
- Apex dialog defaults to Screenshots with Home, Compression and System tools only; no icon/banner gallery tabs.
- The existing selectable native architecture view remains available; obsolete simulation code/styles were removed.
- Dialog capture frame hugs the image (no letterboxing). Card reviewed at desktop and phone widths on the dev server.
- The single webpack production build passed, including TypeScript and static export. GitHub push awaits user review.
- Home is a fresh live capture; Compression/System are existing native verification captures (see CREDITS).
