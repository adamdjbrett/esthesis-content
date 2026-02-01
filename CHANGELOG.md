# Changelog

## 2026-02-01

- Added `metadata.nav` and updated `base.njk` to render header navigation from metadata (includes Archive).
- Created `content/pages/archive.njk` and removed legacy archive artifacts (`content/posts/01.md`–`12.md`, `content/posts/esthesis.org.md`).
- Fixed malformed front matter across pages/posts where closing `---` was attached to previous lines.
- Cleaned `about.md`, `contributors.md`, `editorial-staff.md`, and `submissions.md` to proper markdown-it with corrected front matter.
- Normalized all post descriptions to 150–160 characters (no ellipsis, full words).
- Replaced stray ellipsis characters with `&hellip;` when not part of URLs.
- Removed body “Tagged with:” lines when tags exist in front matter.
- Ensured every post has title/date/author/categories/tags/description in front matter.
- Removed duplicate page content in `content/posts/` that conflicted with `content/pages/` permalinks.
- Build: `npm run build` succeeded; Pagefind reported pages missing `<html>` root (requires later investigation).
- Verified post navigation includes Back/Forward arrows in `post.njk`.
- Added tags/categories index pages and per-tag/per-category pages.
- Added Pagefind search page and metadata hooks for title/description.
- Normalized internal links to remove `../` and `index.html`.
- Removed/neutralized references to missing images in posts.
- Added Pagefind UI passthrough and per-result title/description overrides.
- Archive now renders italic descriptions with ellipsis.
- Created contributor collection and pages from `content/pages/contributors.md` with per-contributor posts lists and a contributor layout.
- Added author-to-contributor linking in `post.njk` and a redirect for the Kenneth Lokensgard slug.
- Rewrote “How Humor Works, Part 1” to clean Markdown (no HTML) and added standardized author bio separators across posts.
- Fixed broken header/inline images by pointing to existing local assets and added new local images for Berliner Humor and Töpffer illustration.
- Scanned posts for missing local images and generated `missing.md` in the repo root with a complete list.
- Ran `npm install` in the correct project root and confirmed dependencies are up to date.

Lessons learned:
- Image paths must match actual files in `public/` (watch for unicode filenames and size-suffixed variants).
- Many WordPress-era assets are missing; use a centralized `missing.md` to coordinate recovery.
- Ensure front matter `---` is on its own line and descriptions are clean Markdown.
- Contributor matching works best when author slugs are normalized and linked consistently.
- Run npm commands from the repo root to avoid ENOENT errors.
