# Esthesis 11ty

Minimal Eleventy site for Esthesis, built from a WordPress export.

## Development

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Content Structure

- `content/posts/` — Markdown posts with front matter
- `content/pages/` — Static pages
- `public/images/` — Images copied from WordPress uploads
- `public/docs/` — Documents copied from WordPress uploads
- `content/redirects.njk` — Redirect rules for moved assets and taxonomy URLs

## Conventions

- `categories` and `tags` are stored as lowercase, hyphenated slugs.
- Display uses `displayName` filter to show Title Case.
- Descriptions are 150–160 characters in double quotes.
- Internal ellipses are normalized to `&hellip;` (except URLs).

## Work Summary (Today)

- Added metadata-driven navigation and inserted Archive into the header.
- Created a clean `archive.njk` page and removed conflicting legacy archive posts.
- Fixed front matter formatting issues across pages and posts.
- Normalized descriptions to 150–160 characters and removed ellipses in descriptions.
- Removed “Tagged with:” lines when tags are present in front matter.
- Cleaned About, Contributors, Editorial Staff, and Submissions pages to proper markdown-it.
- Resolved duplicate permalink conflicts by removing legacy page-post duplicates.
- Verified all posts now have title/date/author/categories/tags/description.
- Ran a production build; Eleventy + Pagefind completed with HTML-root warnings to review later.
- Confirmed post navigation includes Back/Forward arrows in `post.njk`.
- Added tags/categories index + detail pages and Pagefind search page.
- Normalized internal links to remove `../` and `index.html` where applicable.
- Cleaned or removed references to missing images.
- Added Pagefind UI passthrough plus meta/JS hooks to surface per-page title/description in search.
- Archive now shows italic descriptions with an appended ellipsis.
