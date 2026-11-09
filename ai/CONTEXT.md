# Portfolio context (Eugen Ranow)

## Stack & build
- Next.js 16.4.2, React ^19.2, TypeScript ^5.8.3, Tailwind ^4.2.1 (@tailwindcss/postcss), Motion 14.3.0, Radix Dialog, Phosphor icons, CVA + tailwind-merge, shadcn-style `components.json`. Package manager: bun.
- Next is newer than model training data: read the relevant guide in `node_modules/next/dist/docs/` before unfamiliar APIs.
- Dev: `bun run dev --webpack` (port 5173). Build: `bun run build --webpack` (static export to `out/`). Preview: `bun run preview` (port 4173).
- Before calling a change done: `bun run typecheck` and `bun run lint`. Format: `bun run format`.
- Static export for GitHub Pages: use `mediaPath()` for public assets (honors `NEXT_PUBLIC_BASE_PATH`).
- Run one final build only; avoid repeated build loops.

## File map
- `src/app/page.tsx`: page sections. `layout.tsx`: local Geist/Geist Mono fonts and metadata. `not-found.tsx`.
- `src/app/kinetic.css`: visual system, responsive rules, card and dialog treatments. `globals.css`: Tailwind/global base.
- `src/lib/portfolio.ts`: profile/project facts and `mediaPath()`. `project-cards.ts`: card order and summaries. `pipeline.ts`, `utils.ts`, `api/`.
- `src/components/portfolio/`: `project-gallery.tsx` (six accessible full-card triggers), `project-preview.tsx` (card artwork), `project-dialog.tsx` (lazy dialog), `apex-preview.tsx` (Apex screenshot gallery + architecture), `tape31-preview.tsx` (Tape 31 horror jam screenshot gallery + systems).
- `src/components/ui/`: shadcn-style primitives. `src/assets/`: Quantera and Unity logos.
- `public/media/apex/`: product captures, flame icon, wordmark banner. `public/media/tape31/`: in-game and title captures. `public/media/CREDITS.md`: asset provenance.
- `DESIGN.md`: detailed locked visual direction. `.taste-skill/`, `.claude/`, `.mcp.json`: agent tooling.
- Generated/ignore: `.next/`, `out/`, `dist/`, `node_modules/`.

## Design & architecture laws
- Preserve the SpaceX/Linear-inspired atmosphere and self-hosted Geist typography.
- Near-black glass, ivory text, cyan/violet details, white/10 borders; keep the global nebula exposure/vignette.
- Exactly six equal desktop cards across 3 balanced rows: Quantera, Unity 3D games, Tape 31, Apex Desktop, Fitness, Open source.
- Phone cards: artwork above readable copy. Entire cards stay keyboard-accessible dialog triggers.
- Apex uses real Home/Compression/System captures and `apex/icon.svg` (same flame as ApexDesktop/Assets/Apex.svg) beside a Geist wordmark.
- Keep uncropped images in the gallery plus a full-size link. Never replace real product screenshots with fabricated UI.
- Local screenshots are pre-optimized; plain img elements use lazy loading and meaningful alt text.
- Banned: repeated title/eyebrow labels, redundant nested cards, fabricated results, unstyled controls.
- Keep surrounding projects, animations, glass materials, contact info and CV links intact.

## Current state & next steps
- Added dedicated Tape 31 project card and interactive dialog showcase for the Meta Game Jam submission.
- Real in-game captures and title screen converted to optimized WebP in `public/media/tape31/`.
- Interactive modal features screenshot switcher (title, corridor, terminal, chamber, warehouse floor) and jam engineering breakdown.
- Next: run typecheck, lint, build, and launch preview for user inspection.
