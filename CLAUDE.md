# RedefineMe Web App — Development Guide

## What This Is

Next.js 16 web frontend for RedefineMe — a university society event aggregator. Read-only app that displays events scraped from Instagram and processed through an LLM pipeline, stored in Supabase.

Live on Vercel. No auth, no mutations — purely a discovery/browsing experience.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, SSR/ISR) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.3 + CSS custom properties |
| Animations | Framer Motion |
| Database | Supabase (read-only, public anon key) |
| Deployment | Vercel |
| Font | Space Grotesk (Google Fonts) |
| 3D | Spline (landing page robot) |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (landing)/              # Landing page (/)
│   ├── (app)/                  # Main app routes (shared layout with Header/Footer)
│   │   ├── discover/           # Main event discovery
│   │   ├── cities/[citySlug]/
│   │   ├── universities/[uniSlug]/
│   │   ├── categories/[categorySlug]/
│   │   ├── all-events/
│   │   ├── events/[slug]/      # Event detail (ISR, 300s revalidate)
│   │   ├── about/
│   │   ├── support/
│   │   ├── privacy-policy/
│   │   └── delete-account/
│   ├── layout.tsx              # Root layout (font, metadata)
│   └── globals.css             # CSS variables, keyframes, base styles
│
├── components/                 # Reusable UI components
│   ├── EventCard.tsx
│   ├── EventModal.tsx          # Right-slide drawer with URL sync
│   ├── EventDetail.tsx
│   ├── EventGrid.tsx
│   ├── Header.tsx              # Sticky nav with city/university dropdowns
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── FilterPills.tsx
│   ├── SortDropdown.tsx
│   └── ui/                     # Aurora background, spotlight, Spline wrapper
│
├── supabase_lib/               # Data access layer
│   ├── client.ts               # Singleton Supabase client
│   ├── types.ts                # DB row types + frontend types
│   ├── transform.ts            # DB rows → frontend types + slug generation
│   ├── events.ts               # getEvents(), getEventBySlug(), getTrendingEvents()
│   ├── societies.ts
│   ├── universities.ts
│   ├── cities.ts
│   ├── categories.ts
│   └── index.ts                # Barrel export
│
├── utils/
│   ├── dateUtils.ts            # formatDateTime, formatDate, formatTime, isToday, isPast
│   └── eventUtils.ts           # filterEvents, sortEvents, getTrendingEvents, getRelatedEvents
│
├── lib/
│   └── utils.ts                # cn() — clsx + tailwind-merge
│
└── data/
    └── events.ts               # Re-exports Event type
```

---

## Key Patterns

### Server → Client Data Flow
Server Components fetch data from Supabase and pass it as props to Client Components. This is the primary pattern throughout the app.

```
page.tsx (Server) → fetches data → passes to ClientComponent.tsx ('use client')
```

Example: `discover/page.tsx` → `DiscoverPageClient.tsx`

### Data Layer
All Supabase access goes through `src/supabase_lib/`. Raw DB rows are transformed into frontend types via `transform.ts`. Never query Supabase directly from components — use the functions in the supabase_lib modules.

### Modal with URL Sync
The event modal syncs its state to URL search params (`?event=[slug]`), enabling shareable links and browser back/forward support.

### Slug Generation
Slugs are generated client-side via `generateSlug()` in `transform.ts`. Currently, `getEventBySlug()` fetches all events and matches locally — be aware of this if event count grows significantly.

---

## Coding Conventions

### Components
- **PascalCase** filenames and component names
- Props defined as `interface ComponentNameProps`
- Default exports for page components, named exports acceptable for shared components
- `'use client'` directive only on components that need interactivity

### Functions & Variables
- **camelCase** for functions, variables, and hooks
- Type annotations on function signatures

### Styling
- Tailwind utility classes as the primary styling method
- CSS custom properties defined in `globals.css` for design tokens (colors, shadows, radius)
- Use `cn()` from `lib/utils.ts` for conditional/merged class names
- Reference design tokens: `text-[var(--text)]`, `bg-[var(--accent)]`, etc.

### Design Tokens (defined in globals.css + tailwind.config.js)
- `--bg: #FAFAFA` — page background
- `--surface: #FFFFFF` — card/surface background
- `--text: #0F172A` — primary text
- `--muted: #64748B` — secondary text
- `--accent: #6366F1` — primary brand color (indigo)
- `--border: #E5E7EB` — borders
- `--red: #EF4444` — accent/CTA red
- `--radius: 16px` — default border radius

### Data Types
- `Event`, `Society`, `University`, `City`, `Category` — frontend types (transformed)
- `EventRow`, `SocietyRow`, etc. — raw Supabase row types
- `EventWithRelations`, `SocietyWithUniversity` — joined query types
- `SortOption` — `'soonest' | 'trending' | 'newest'`

---

## Image Domains (next.config.js)

Allowed remote image sources:
- `dgzzf6k1ibya0.cloudfront.net` — CloudFront CDN (primary event images)
- `redefine-me-image-bucket.s3.amazonaws.com` — S3 bucket (event images)
- `scontent-man2-1.cdninstagram.com` — Instagram CDN
- `images.unsplash.com` — Placeholder images
- `via.placeholder.com` — Fallback placeholders

When adding new image sources, add them to `remotePatterns` in `next.config.js`.

---

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run Next.js ESLint
```

---

## Deployment

- **Platform**: Vercel
- **Config**: `vercel.json` (framework: nextjs)
- **ISR**: Event detail pages revalidate every 300 seconds
- **Environment**: No `.env` file currently — Supabase public credentials are hardcoded in `supabase_lib/client.ts`

---

## Things to Know

1. **Read-only app** — no auth, no mutations, no user accounts. All data comes from the scraper pipeline.
2. **No test framework** — testing is manual. Consider adding Vitest if coverage is needed.
3. **Supabase keys are public** (anon key) — safe to embed in frontend, but consider moving to env vars for cleanliness.
4. **The `(app)` route group** shares a layout with Header, Footer, and AuroraBackground. The `(landing)` group has its own distinct layout.
5. **Framer Motion** is used extensively for entrance animations, modal transitions, and hover effects.
6. **Event slugs** are generated at transform time, not stored in the DB. Slug-based lookups fetch all events then filter — acceptable at current scale but won't scale past ~1000 events.
