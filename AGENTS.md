<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project: Signal Notes (WordPress + Next.js blog)

### Architecture
- Next.js 16.2.4 App Router with Turbopack
- WPGraphQL backend at `https://mellowhair.s6-tastewp.com/graphql` (introspection disabled)
- Apollo Client v4 + TanStack Query v5 + Zustand v5
- Framer Motion for animations, lucide-react for icons
- Design system in `globals.css`: colors (ink #474642, paper #fcf7f1, accent #dcac96), Poppins font, 8px radius base

### WPGraphQL quirks
- `postBy`, `userBy`, `categoryBy` do NOT exist — use `post(id: $slug, idType: SLUG)`, `user(id: $slug, idType: SLUG)`, `category(id: $slug, idType: SLUG)` with `ID!` type
- No Yoast/WPSEO WPGraphQL plugin — `seo` field not available on `Post`
- Use `excerpt: string | null` in types (WPGraphQL can return null)
- lucide-react icons are NOT available in Server Components — use inline SVGs instead

### Next.js 16 specific
- `revalidateTag(tag, 'max')` — **requires second argument** (`'max'` or `{ expire?: number }`)
- `revalidatePath(path, type?)` — unchanged from v15
- `suppressHydrationWarning` on `<body>` recommended (browser extensions inject attributes)
- Defer theme-icon SVG rendering with `mounted` guard to avoid hydration mismatch
- Zustand `useSyncExternalStore` breaks in SSG — keep Zustand imports in client-only components

### Premium Components
- `HeroSection.tsx` — featured post carousel with auto-advance, animated transitions, secondary cards, dot navigation
- `CardVariants.tsx` — 5 card variants: default (glassmorphism), featured (horizontal split), horizontal (compact row), compact (minimal border), editorial (gradient card)
- `Sidebar.tsx` — right sidebar with TOC (post pages), trending posts (numbered), categories (pill tags), newsletter signup, AI picks placeholder
- `InfiniteScroll.tsx` — IntersectionObserver-based infinite scroll with skeleton loading + manual "Load more" fallback
- `BottomNav.tsx` — mobile bottom navigation with active state (Home, Journal, Search, Bookmarks)
- `FloatingShareBar.tsx` — fixed left share bar (Twitter, LinkedIn, copy link, like reaction)
- `CommandPalette.tsx` — ⌘K search modal with animated overlay, suggestions, keyboard navigation
- `motion/` — PageTransition, Reveal (scroll-triggered), Stagger/StaggerItem (staggered children)
- `skeletons/` — ArticleSkeleton, CommentSkeleton, SidebarSkeleton
- `BookmarkButton.tsx` — client component reading/writing Zustand localStorage directly

### Homepage Architecture
1. **HeroSection** — auto-rotating featured carousel + 3 secondary cards
2. **Editor's Picks** — staggered editorial cards with reveal animation
3. **Trending Now** — numbered grid with numbered list styling
4. **BlogSection** — existing tag-filtered grid
5. **Newsletter CTA** — centered signup with gradient background

### Blog Listing Architecture
- `/blog` is dynamic (`ƒ`) — uses `searchParams.after` for cursor pagination
- Grid: 2-col on desktop with 280px sticky right sidebar
- Sidebar: trending posts, categories, newsletter, AI picks

### Article Page Architecture
- FloatingShareBar (fixed left, appears after scroll)
- Breadcrumbs with BreadcrumbList JSON-LD schema
- Main content + sticky right sidebar with TOC and related posts
- Author bio, related posts, comments below
- ReadingProgress bar + BackToTop button

### Build
- Run `npm run build` to verify (builds 35+ routes)
- Route types: `○` static, `●` SSG (generateStaticParams), `ƒ` dynamic (searchParams/data)
- All data fetches use `revalidate: 3600` (1-hour ISR)
- Webhook at `/api/revalidate?secret=KEY` for on-demand ISR
- CSP headers, PWA manifest, RSS feed at `/feed.xml`

### Key files
- `graphql/queries.ts` — all WPGraphQL queries
- `lib/posts.ts` — data access layer (cached fetches with normalization)
- `lib/graphql-server.ts` — base fetch wrapper with tags and revalidation
- `lib/store.ts` — Zustand persist store (theme, searchHistory, bookmarks, recentPosts)
- `lib/query-provider.tsx` — TanStack Query provider
- `types/blog.ts` — WPPost, WPCardPost, Menu, Page types
- `components/HeaderWrapper.tsx` — server component that fetches WordPress menus
- `app/api/revalidate/route.ts` — ISR webhook
- `app/manifest.ts` — PWA manifest
- `app/feed.xml/route.ts` — Atom RSS feed
- `next.config.ts` — CSP, security headers, image optimization
