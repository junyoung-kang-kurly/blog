# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router blog backed by Velite-generated MDX content.
- `src/app/`: route segments and pages (e.g., `src/app/posts/[slug]/page.tsx`).
- `src/components/`: reusable UI and MDX rendering components.
- `src/lib/`: shared utilities (date formatting, sorting).
- `content/posts/`: MDX posts (date-prefixed filenames like `2024-05-01-my-post.mdx`).
- `public/`: static assets served at the site root.
- `velite.config.ts` and `.velite/`: content schema and generated output (do not edit `.velite/`).

## Build, Test, and Development Commands
- `pnpm install`: install dependencies.
- `pnpm dev`: run the local dev server (webpack mode required by Velite).
- `pnpm build`: generate production build and Velite output.
- `pnpm start`: serve the production build locally.
- `pnpm lint`: run ESLint checks.

## Coding Style & Naming Conventions
Use TypeScript, React, and Tailwind CSS for UI. Follow existing conventions:
- 2-space indentation, semicolons, and double quotes as seen in `src/`.
- Path aliases: `@/` for `src/*`, `#site/content` for Velite output.
- MDX posts require frontmatter with `title`, `description`, `date`, `published`, and `tags`; see `post_writing_guideline.md` for details.

## Testing Guidelines
There is no automated test runner or `test` script configured. Run `pnpm lint` and do a quick manual check with `pnpm dev` or `pnpm start` when changing UI or content rendering. If you add tests, include a `pnpm test` script and document the framework here.

## Commit & Pull Request Guidelines
Recent history mixes Conventional Commit prefixes (`docs:`, `fix:`, `refactor:`) with short descriptive messages in Korean/English. Prefer Conventional Commit-style prefixes for code changes and keep messages concise.
PRs should include a clear summary, relevant issue links, and manual verification steps. Add screenshots or before/after notes for UI or content-rendering changes.

## Agent Notes
For additional project-specific guidance (Velite schema, webpack requirement, content access), reference `CLAUDE.md`.
