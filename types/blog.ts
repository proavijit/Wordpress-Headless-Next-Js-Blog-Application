export type WPPost = {
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: {
    node: {
      databaseId: number;
      name: string;
      slug: string;
      avatar?: { url: string } | null;
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: { width: number; height: number };
    };
  } | null;
  categories: {
    nodes: Array<{
      databaseId: number;
      name: string;
      slug: string;
    }>;
  };
  tags: {
    nodes: Array<{
      databaseId: number;
      name: string;
      slug: string;
    }>;
  };
  readingTime?: string;
};

export type WPCardPost = {
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string | null;
  date: string;
  modified: string;
  author: {
    node: {
      databaseId: number;
      name: string;
      slug: string;
      avatar?: { url: string } | null;
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: { width: number; height: number };
    };
  } | null;
  categories: {
    nodes: Array<{
      databaseId: number;
      name: string;
      slug: string;
    }>;
  };
  tags: {
    nodes: Array<{
      databaseId: number;
      name: string;
      slug: string;
    }>;
  };
  readingTime?: string;
};

export type PostsPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type PostsQueryResult = {
  posts: {
    nodes: WPCardPost[];
    pageInfo: PostsPageInfo;
  };
};

export type PostBySlugResult = {
  post: WPPost | null;
};

export type Category = {
  databaseId: number;
  name: string;
  slug: string;
  count?: number;
};

export type CategoriesResult = {
  categories: {
    nodes: Category[];
  };
};

export type Tag = {
  databaseId: number;
  name: string;
  slug: string;
  count?: number;
};

export type TagsResult = {
  tags: {
    nodes: Tag[];
  };
};

export type Author = {
  databaseId: number;
  name: string;
  slug: string;
  avatar?: { url: string } | null;
  description?: string;
};

export type AuthorsResult = {
  users: {
    nodes: Author[];
  };
};

export type CategoryPostsResult = {
  category: {
    databaseId: number;
    name: string;
    slug: string;
    description?: string;
    posts: {
      nodes: WPCardPost[];
      pageInfo: PostsPageInfo;
    };
  } | null;
};

export type AuthorPostsResult = {
  user: {
    databaseId: number;
    name: string;
    slug: string;
    avatar?: { url: string } | null;
    description?: string;
    posts: {
      nodes: WPCardPost[];
      pageInfo: PostsPageInfo;
    };
  } | null;
};

export type Comment = {
  databaseId: number;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar?: { url: string } | null;
    };
  };
};

export type CommentsResult = {
  comments: {
    nodes: Comment[];
  };
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type RelatedPostsResult = {
  posts: {
    nodes: WPCardPost[];
  };
};

export type AllSlugsResult = {
  posts: { nodes: { slug: string; modified: string }[] };
  categories: { nodes: { slug: string }[] };
  users: { nodes: { slug: string }[] };
  pages: { nodes: { slug: string; date: string }[] };
};

export type MenuItem = {
  label: string;
  path: string;
  target?: string;
  parentId?: string | null;
};

export type Menu = {
  id: string;
  name: string;
  menuItems: {
    nodes: MenuItem[];
  };
};

export type MenusResult = {
  menus: {
    nodes: Menu[];
  };
};

export type Page = {
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
};

export type PagesResult = {
  pages: {
    nodes: Page[];
  };
};

export type PageBySlugResult = {
  page: Page | null;
};

export type SearchPostItem = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: { node: { name: string } };
  featuredImage?: { node: { sourceUrl: string; altText: string } } | null;
  categories: { nodes: { name: string; slug: string }[] };
};

export type SearchPostsResult = {
  posts: {
    nodes: SearchPostItem[];
    pageInfo: PostsPageInfo;
  };
};

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  isoDate: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  category?: string;
};
