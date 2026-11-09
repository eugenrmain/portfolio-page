# Gotchas

Format: `- Symptom → cause → fix`

- Unfamiliar Next.js API fails or behaves unexpectedly → Next 16.4.2 is newer than model training data → read the matching guide in `node_modules/next/dist/docs/` first.
- Assets 404 on GitHub Pages → hard-coded public paths ignore base path → wrap with `mediaPath()` (`NEXT_PUBLIC_BASE_PATH`).
