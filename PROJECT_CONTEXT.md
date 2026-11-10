# Portfolio context

## Stack and commands

- Next.js 16.4.2, React 19.2, TypeScript 5.8, Tailwind 4.2, Motion 14.3, Radix Dialog.
- `bun run dev --webpack` serves port 5173. One final `bun run build --webpack` exports to `out/`.
- Static export; use `mediaPath()` for public assets and GitHub Pages `NEXT_PUBLIC_BASE_PATH` compatibility.

## File map

- `src/app/page.tsx`: page sections. `layout.tsx`: local Geist/Geist Mono fonts and metadata.
- `src/app/kinetic.css`: visual system, responsive rules, card and dialog treatments.
- `src/lib/portfolio.ts`: profile/project facts and `mediaPath()`. `project-cards.ts`: card order and summaries.
- `src/components/portfolio/`: `project-gallery.tsx` (six accessible full-card triggers), `project-preview.tsx` (card artwork), `project-dialog.tsx` (lazy dialog), `apex-preview.tsx` (Apex screenshots), `tape31-preview.tsx` (Tape 31 horror jam screenshots).
- `public/media/apex/`: product captures, flame icon, wordmark banner.
- `public/media/tape31/`: in-game captures and title screen from Tape 31.
- `DESIGN.md`: detailed locked visual direction. `public/media/CREDITS.md`: asset provenance.

## Design laws

- Preserve the SpaceX/Linear-inspired atmosphere and self-hosted Geist typography.
- Near-black glass, ivory text, cyan/violet details, white/10 borders; preserve the global nebula exposure/vignette.
- Exactly six equal desktop cards across 3 balanced rows: Quantera, Unity 3D games, Tape 31, Apex Desktop, Fitness, Open source.
- Phone cards place artwork above readable copy. Entire cards remain keyboard-accessible dialog triggers.
- Apex uses real Home/Compression/System captures and `apex/icon.svg` beside a Geist wordmark.
- Tape 31 uses real in-game captures, title screen, and itch.io link from the Game Theory Fall Jam.
- Keep uncropped images in the gallery and a full-size link. Never replace actual product screenshots with fabricated UI.
- Existing local screenshots are preoptimized; ordinary img elements have lazy loading and meaningful alt text.
- No repeated title/eyebrow labels, redundant nested cards, fabricated results, or unstyled controls.
- Keep surrounding projects, animations, glass materials, contact information and CV links intact.
