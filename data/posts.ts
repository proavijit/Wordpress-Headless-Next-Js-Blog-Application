import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "designing-ai-products-that-earn-trust",
    title: "Designing AI Products That Earn Trust",
    excerpt:
      "A practical look at confirmations, transparency, and graceful failure states in AI-powered interfaces.",
    author: "Maya Chen",
    authorRole: "AI product strategist",
    authorAvatar: "MC",
    date: "Apr 18, 2026",
    isoDate: "2026-04-18",
    readingTime: "5 min read",
    image: "/blog/ai-products.svg",
    imageAlt: "Abstract interface panels connected by AI nodes",
    tags: ["AI", "Product", "Design"],
    content: [
      {
        type: "paragraph",
        text: "Trust is not a visual treatment. It is the result of repeated moments where a product behaves clearly, admits uncertainty, and keeps the person using it in control.",
      },
      {
        type: "paragraph",
        text: "AI interfaces make this harder because the system can be useful and unpredictable at the same time. A good experience gives people enough context to decide when the answer deserves confidence.",
      },
      {
        type: "heading",
        text: "Make uncertainty visible",
      },
      {
        type: "paragraph",
        text: "When a model is guessing, summarizing, or synthesizing, the interface should make that distinction visible. Small labels, source trails, and confidence cues can reduce the false authority that polished language creates.",
      },
      {
        type: "list",
        items: [
          "Show the inputs that shaped the response.",
          "Expose citations or source snippets where accuracy matters.",
          "Give users a clear path to revise the request.",
        ],
      },
      {
        type: "quote",
        text: "A trustworthy AI product does not pretend to be certain. It helps users understand what kind of answer they are looking at.",
      },
      {
        type: "heading",
        text: "Design for recovery",
      },
      {
        type: "paragraph",
        text: "Failures should feel recoverable. Good AI products include undo, regeneration, editable drafts, and human-readable explanations for why a result may have changed.",
      },
    ],
  },
  {
    id: 2,
    slug: "modern-typescript-toolkit",
    title: "The Modern TypeScript Toolkit",
    excerpt:
      "Patterns, compiler settings, and library choices that keep large front-end codebases calm and predictable.",
    author: "Nolan Brooks",
    authorRole: "Staff front-end engineer",
    authorAvatar: "NB",
    date: "Apr 12, 2026",
    isoDate: "2026-04-12",
    readingTime: "6 min read",
    image: "/blog/typescript-toolkit.svg",
    imageAlt: "Code editor cards with TypeScript symbols",
    tags: ["Programming", "Tech"],
    content: [
      {
        type: "paragraph",
        text: "TypeScript pays for itself when teams treat it as a design tool, not just a spellchecker for JavaScript. The best codebases make invalid states awkward to represent.",
      },
      {
        type: "heading",
        text: "Start with sharper boundaries",
      },
      {
        type: "paragraph",
        text: "Define API payloads, component contracts, and domain objects in one place. Then let inference carry details through the system instead of repeating types by hand.",
      },
      {
        type: "list",
        items: [
          "Prefer discriminated unions for state machines.",
          "Keep public component props explicit and narrow.",
          "Use strict compiler settings before adding clever abstractions.",
        ],
      },
      {
        type: "paragraph",
        text: "A calm toolkit is usually boring in the best way: clear types, predictable helpers, and fewer places where runtime values can surprise the UI.",
      },
    ],
  },
  {
    id: 3,
    slug: "shipping-faster-with-better-component-apis",
    title: "Shipping Faster With Better Component APIs",
    excerpt:
      "How thoughtful prop design, composition, and defaults make product teams move with less friction.",
    author: "Ari Patel",
    authorRole: "Design systems lead",
    authorAvatar: "AP",
    date: "Mar 29, 2026",
    isoDate: "2026-03-29",
    readingTime: "4 min read",
    image: "/blog/component-apis.svg",
    imageAlt: "Reusable component blocks arranged in a grid",
    tags: ["Programming", "Design"],
    content: [
      {
        type: "paragraph",
        text: "A component API is a tiny product surface. It has users, tradeoffs, edge cases, and a learning curve. When the API is clear, teams spend less time negotiating with the component.",
      },
      {
        type: "heading",
        text: "Defaults should encode intent",
      },
      {
        type: "paragraph",
        text: "Good defaults make the common path effortless while still allowing escape hatches for specific product needs. That balance is where velocity comes from.",
      },
      {
        type: "list",
        items: [
          "Name props after product meaning, not CSS implementation.",
          "Prefer composition when layout decisions vary widely.",
          "Document the two or three examples people actually copy.",
        ],
      },
      {
        type: "quote",
        text: "The best component APIs feel obvious after you use them once.",
      },
    ],
  },
  {
    id: 4,
    slug: "what-developers-need-from-ai-code-review",
    title: "What Developers Need From AI Code Review",
    excerpt:
      "Useful code review assistants should surface risk, preserve intent, and explain tradeoffs without noise.",
    author: "Sofia Ramirez",
    authorRole: "Developer experience researcher",
    authorAvatar: "SR",
    date: "Mar 17, 2026",
    isoDate: "2026-03-17",
    readingTime: "5 min read",
    image: "/blog/ai-review.svg",
    imageAlt: "Pull request review screen with AI annotations",
    tags: ["AI", "Programming"],
    content: [
      {
        type: "paragraph",
        text: "Code review is not a search for imperfections. It is a collaboration around risk. AI review tools become valuable when they understand that distinction.",
      },
      {
        type: "heading",
        text: "Prioritize behavioral risk",
      },
      {
        type: "paragraph",
        text: "Formatting notes and generic style suggestions rarely justify interrupting a developer. The assistant should focus on correctness, security, accessibility, and missing tests.",
      },
      {
        type: "list",
        items: [
          "Point to the exact line or behavior at risk.",
          "Explain the scenario that breaks.",
          "Suggest a small, local fix when possible.",
        ],
      },
      {
        type: "paragraph",
        text: "A review assistant earns trust by being specific. It should leave fewer comments, but make each one count.",
      },
    ],
  },
  {
    id: 5,
    slug: "field-guide-to-clean-dashboards",
    title: "A Field Guide to Clean Dashboards",
    excerpt:
      "Dense software can still feel elegant when hierarchy, spacing, and interaction states are handled carefully.",
    author: "Jon Bell",
    authorRole: "Product designer",
    authorAvatar: "JB",
    date: "Feb 26, 2026",
    isoDate: "2026-02-26",
    readingTime: "4 min read",
    image: "/blog/clean-dashboards.svg",
    imageAlt: "Dashboard cards with charts and status indicators",
    tags: ["Design", "Tech"],
    content: [
      {
        type: "paragraph",
        text: "Operational interfaces do not need to be loud to feel modern. They need hierarchy, restraint, and reliable scan paths.",
      },
      {
        type: "heading",
        text: "Density is not the enemy",
      },
      {
        type: "paragraph",
        text: "Useful dashboards often need a lot of information on screen. The trick is to separate content by priority, keep repeated patterns consistent, and reserve strong contrast for real decisions.",
      },
      {
        type: "list",
        items: [
          "Use section rhythm instead of nested cards.",
          "Align numbers and labels for fast comparison.",
          "Make empty, loading, and error states feel designed.",
        ],
      },
      {
        type: "paragraph",
        text: "Clean dashboards feel quiet because the interface knows which details deserve attention first.",
      },
    ],
  },
  {
    id: 6,
    slug: "building-reliable-nextjs-interfaces",
    title: "Building Reliable Next.js Interfaces",
    excerpt:
      "Small architectural habits that make App Router projects easier to test, extend, and reason about.",
    author: "Leah Kim",
    authorRole: "Next.js architect",
    authorAvatar: "LK",
    date: "Feb 10, 2026",
    isoDate: "2026-02-10",
    readingTime: "6 min read",
    image: "/blog/next-interfaces.svg",
    imageAlt: "Layered web application windows with routing paths",
    tags: ["Next.js", "Programming", "Tech"],
    content: [
      {
        type: "paragraph",
        text: "Reliable interfaces come from predictable boundaries. App Router makes this especially important because server and client components are part of the design vocabulary.",
      },
      {
        type: "heading",
        text: "Keep interactivity local",
      },
      {
        type: "paragraph",
        text: "Use server components for static structure and data preparation, then place client boundaries around the smallest interactive surface that needs state or browser APIs.",
      },
      {
        type: "list",
        items: [
          "Keep route data close to the route.",
          "Use loading UI for slow segments.",
          "Let metadata come from the same source as the page content.",
        ],
      },
      {
        type: "quote",
        text: "The best App Router projects make the server-client split easy to see from the file tree.",
      },
    ],
  },
];
