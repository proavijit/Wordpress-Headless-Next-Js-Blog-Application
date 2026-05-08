# Headless WordPress Blog Integration System

This document outlines the architecture and implementation steps to build a scalable, highly-performant Headless WordPress Blog using Next.js 15 (App Router), Apollo Client, Tailwind CSS, and Shadcn UI.

## User Review Required

> [!WARNING]  
> Please review the chosen libraries and architecture. 
> 1. We will use **Apollo Client** with `@apollo/experimental-nextjs-app-support` to support React Server Components and Next.js App Router properly.
> 2. For styling, we will use **Tailwind CSS v4** (which is already initialized in your `package.json`) and **Shadcn UI** for accessible components.
> 3. I will provide the WordPress plugin setup instructions, but you will need to manually install and configure them in your WordPress dashboard at `https://mellowhair.s6-tastewp.com/wp-admin/` since I cannot access the WP Admin panel directly.

## Open Questions

> [!IMPORTANT]
> 1. Do you already have the WPGraphQL plugins installed on your WordPress instance, or should I wait for you to set them up before proceeding with the GraphQL code generation?
> 2. Are you using a specific theme for WordPress, or is it fully headless (meaning WP is just an API)?
> 3. Do you have a preferred UI color palette or aesthetic for the modern SaaS-style design? (If not, I will use a sleek dark mode with subtle purple/blue accents).

## Proposed Changes

---

### Phase 1: Dependency & Architecture Setup

#### [NEW] `lib/apollo-client.ts`
Setup Apollo Client for React Server Components (RSC) and Client Components.

#### [NEW] `codegen.ts`
Configure GraphQL Code Generator to automatically generate TypeScript types from your WPGraphQL schema.

#### [MODIFY] `package.json`
Install necessary dependencies:
- `@apollo/client`, `@apollo/experimental-nextjs-app-support`, `graphql`
- `@graphql-codegen/cli`, `@graphql-codegen/client-preset`
- `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`
- Shadcn UI dependencies (`radix-ui` components).

#### [NEW] `.env.local`
Set environment variables:
```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://mellowhair.s6-tastewp.com/graphql
WP_JWT_AUTH_SECRET=your_secret_here
```

---

### Phase 2: GraphQL & API Layer

#### [NEW] `graphql/queries.ts`
Centralize all GraphQL queries:
- `GET_POSTS`, `GET_POST_BY_SLUG`
- `GET_CATEGORIES`, `GET_TAGS`
- `GET_AUTHORS`

#### [NEW] `graphql/mutations.ts`
Centralize GraphQL mutations:
- `LOGIN_MUTATION`
- `REGISTER_MUTATION`
- `ADD_COMMENT_MUTATION`

#### [NEW] `lib/api.ts`
Utility functions wrapping Apollo Client calls with proper error handling and caching strategies (ISR/SSR).

---

### Phase 3: UI Components (Shadcn UI & Custom)

#### [NEW] `components/ui/*`
Generate Shadcn UI components: `Button`, `Input`, `Card`, `Skeleton`, `Avatar`, `Badge`, `Toast`.

#### [NEW] `components/layout/Header.tsx` & `Footer.tsx`
Responsive navigation with dark mode toggle and search bar.

#### [NEW] `components/blog/PostCard.tsx`
Reusable card component for blog posts with Framer Motion animations.

#### [NEW] `components/blog/RichText.tsx`
Component to safely render WordPress HTML content with proper Tailwind typography styling.

---

### Phase 4: App Pages & Routing

#### [MODIFY] `app/layout.tsx`
Integrate Apollo Provider, Dark Mode Provider, and layout structure.

#### [MODIFY] `app/page.tsx`
Home page with Featured Posts, Latest Posts, and Category Sections.

#### [NEW] `app/blog/page.tsx`
Blog listing page with infinite scroll, filtering, and search.

#### [NEW] `app/blog/[slug]/page.tsx`
Single post page with dynamic metadata (SEO), OpenGraph tags, reading time, and comments.

#### [NEW] `app/category/[slug]/page.tsx`
Category archive page.

#### [NEW] `app/author/[slug]/page.tsx`
Author profile and their posts.

#### [NEW] `app/(auth)/login/page.tsx`
Login page utilizing WP JWT Authentication.

---

### Phase 5: SEO & Performance

#### [NEW] `app/sitemap.ts`
Dynamic sitemap generation using WPGraphQL data.

#### [NEW] `app/robots.ts`
Configure robots.txt.

#### [NEW] `lib/seo.ts`
Helper functions to map WPGraphQL SEO data to Next.js Metadata API.

---

## Verification Plan

### Automated Tests
1. Verify GraphQL endpoint connectivity.
2. Run TypeScript compiler `npx tsc --noEmit` to ensure type safety.
3. Lint code with `npm run lint`.

### Manual Verification
1. I will provide a step-by-step checklist for you to configure WordPress.
2. Once configured, I will run the dev server and verify that posts are successfully fetched and displayed.
3. Test dark mode persistence.
4. Verify dynamic routing and SEO metadata in the browser.
