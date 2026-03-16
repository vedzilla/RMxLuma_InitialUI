# RedefineMe Web App — Development Guide

## What This Is

Next.js 16 web frontend for RedefineMe — a university society event aggregator. Read-only, no auth, no mutations. Displays events scraped from Instagram, processed via LLM pipeline, stored in Supabase. Live on Vercel.

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
│   ├── (app)/                  # Main app routes (shared Header/Footer layout)
│   │   ├── discover/           # Main event discovery
│   │   ├── cities/[citySlug]/
│   │   ├── universities/[uniSlug]/
│   │   ├── categories/[categorySlug]/
│   │   ├── events/[slug]/      # Event detail (ISR, 300s revalidate)
│   │   ├── all-events/
│   │   └── about/ support/ privacy-policy/ delete-account/
│   ├── layout.tsx              # Root layout (font, metadata)
│   └── globals.css             # CSS variables, keyframes, base styles
│
├── components/                 # Reusable UI components
│   ├── EventCard/Modal/Detail/Grid.tsx
│   ├── Header.tsx              # Sticky nav with city/university dropdowns
│   ├── SearchBar.tsx, FilterPills.tsx, SortDropdown.tsx
│   └── ui/                     # Aurora background, spotlight, Spline wrapper
│
├── supabase_lib/               # Data access layer (ALL Supabase queries go here)
│   ├── client.ts               # Singleton Supabase client
│   ├── types.ts                # DB row types + frontend types
│   ├── transform.ts            # DB rows → frontend types + slug generation
│   ├── events.ts               # getEvents(), getEventBySlug(), getTrendingEvents()
│   ├── societies.ts / universities.ts / cities.ts / categories.ts
│   └── index.ts                # Barrel export
│
├── utils/
│   ├── dateUtils.ts            # formatDateTime, formatDate, isToday, isPast
│   └── eventUtils.ts           # filterEvents, sortEvents, getRelatedEvents
│
└── lib/utils.ts                # cn() — clsx + tailwind-merge
```

---

## Key Patterns

### Server → Client Data Flow
Server Components fetch from Supabase, pass props to Client Components:
`page.tsx (Server) → ClientComponent.tsx ('use client')`

### Data Layer
All Supabase access goes through `src/supabase_lib/`. Raw DB rows are transformed via `transform.ts`. Never query Supabase directly from components.

### Modal with URL Sync
Event modal syncs to URL search params (`?event=[slug]`), enabling shareable links and browser back/forward.

### Slug Generation
Slugs generated client-side via `generateSlug()` in `transform.ts`, not stored in DB. `getEventBySlug()` fetches all events then filters locally — won't scale past ~1000 events.

---

## Coding Conventions

### Components
- **PascalCase** filenames and component names
- Props: `interface ComponentNameProps`
- Default exports for pages, named exports for shared components
- `'use client'` only on interactive components

### Functions & Variables
- **camelCase** for functions, variables, hooks
- Type annotations on function signatures

### Styling
- Tailwind utility classes as primary styling method
- CSS custom properties in `globals.css` for design tokens
- Use `cn()` from `lib/utils.ts` for conditional class merging
- Reference tokens: `text-[var(--text)]`, `bg-[var(--accent)]`, etc.

### Design Tokens (globals.css + tailwind.config.js)
`--bg: #FAFAFA` (page bg), `--surface: #FFFFFF` (cards), `--text: #0F172A`, `--muted: #64748B`, `--accent: #6366F1` (indigo), `--border: #E5E7EB`, `--red: #EF4444` (CTA), `--radius: 16px`

### Data Types
- Frontend: `Event`, `Society`, `University`, `City`, `Category` (transformed)
- DB rows: `EventRow`, `SocietyRow`, etc.
- Joined: `EventWithRelations`, `SocietyWithUniversity`
- `SortOption`: `'soonest' | 'trending' | 'newest'`

---

## Image Domains (next.config.js)

Add new sources to `remotePatterns` in `next.config.js`. Current allowed domains:
- `dgzzf6k1ibya0.cloudfront.net` — CloudFront CDN (primary)
- `redefine-me-image-bucket.s3.amazonaws.com` — S3 bucket
- `scontent-man2-1.cdninstagram.com` — Instagram CDN
- `images.unsplash.com`, `via.placeholder.com` — Placeholders

---

## Commands

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
```

---

## Deployment

- **Platform**: Vercel (`vercel.json`, framework: nextjs)
- **ISR**: Event detail pages revalidate every 300s
- **Environment**: Supabase public credentials hardcoded in `supabase_lib/client.ts` (no `.env`)

---

## Things to Know

1. **Read-only app** — no auth, no mutations. All data from scraper pipeline.
2. **No test framework** — manual testing only. Consider Vitest if needed.
3. **Supabase anon key** is public and safe to embed, but consider env vars for cleanliness.
4. **Route groups**: `(app)` shares Header/Footer/AuroraBackground layout; `(landing)` has its own.
5. **Framer Motion** used extensively for animations and transitions.
6. **Event slugs** generated at transform time, not in DB. Lookup fetches all then filters.
