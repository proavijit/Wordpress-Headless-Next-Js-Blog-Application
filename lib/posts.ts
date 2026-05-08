import { cache } from "react";
import { fetchGraphQL } from "./graphql-server";
import {
  GET_POSTS,
  GET_POST_BY_SLUG,
  GET_CATEGORIES,
  GET_TAGS,
  GET_AUTHORS,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_BY_AUTHOR,
  GET_COMMENTS,
  GET_RELATED_POSTS,
  GET_ALL_SLUGS,
  GET_MENUS,
  GET_PAGES,
  GET_PAGE_BY_SLUG,
  SEARCH_POSTS,
} from "@/graphql/queries";
import type {
  WPPost,
  WPCardPost,
  PostsQueryResult,
  PostBySlugResult,
  CategoriesResult,
  TagsResult,
  AuthorsResult,
  CategoryPostsResult,
  AuthorPostsResult,
  CommentsResult,
  RelatedPostsResult,
  AllSlugsResult,
  MenusResult,
  PagesResult,
  PageBySlugResult,
  SearchPostsResult,
  Comment,
  Menu,
  Page,
} from "@/types/blog";

function calculateReadingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function normalizePost(post: WPPost) {
  return {
    ...post,
    readingTime: calculateReadingTime(post.content),
  };
}

function normalizeCardPost(post: WPCardPost) {
  return {
    ...post,
    excerpt: post.excerpt ?? "",
    readingTime: calculateReadingTime(post.excerpt || post.title),
  };
}

export const getAllPosts = cache(async (first = 50) => {
  const data = await fetchGraphQL<PostsQueryResult>(GET_POSTS, { first }, { tags: ["posts"] });
  return data.posts.nodes.map(normalizeCardPost);
});

export const getPostsPage = cache(async (first = 9, after?: string) => {
  const data = await fetchGraphQL<PostsQueryResult>(GET_POSTS, { first, after: after || null });
  return {
    posts: data.posts.nodes.map(normalizeCardPost),
    pageInfo: data.posts.pageInfo,
  };
});

export const getPostBySlug = cache(async (slug: string) => {
  const data = await fetchGraphQL<PostBySlugResult>(GET_POST_BY_SLUG, { slug });
  if (!data.post) return null;
  return normalizePost(data.post);
});

export const getAllCategories = cache(async () => {
  const data = await fetchGraphQL<CategoriesResult>(GET_CATEGORIES);
  return data.categories.nodes;
});

export const getAllTags = cache(async () => {
  const data = await fetchGraphQL<TagsResult>(GET_TAGS);
  return data.tags.nodes;
});

export const getAllAuthors = cache(async () => {
  const data = await fetchGraphQL<AuthorsResult>(GET_AUTHORS);
  return data.users.nodes;
});

export const getPostsByCategory = cache(async (slug: string, first = 50) => {
  try {
    const data = await fetchGraphQL<CategoryPostsResult>(GET_POSTS_BY_CATEGORY, { slug, first });
    if (!data.category) return null;
    return {
      category: data.category,
      posts: data.category.posts.nodes.map(normalizeCardPost),
      pageInfo: data.category.posts.pageInfo,
    };
  } catch {
    return null;
  }
});

export const getPostsByAuthor = cache(async (slug: string, first = 50) => {
  const data = await fetchGraphQL<AuthorPostsResult>(GET_POSTS_BY_AUTHOR, { slug, first });
  if (!data.user) return null;
  return {
    author: data.user,
    posts: data.user.posts.nodes.map(normalizeCardPost),
    pageInfo: data.user.posts.pageInfo,
  };
});

export const getPostsByTag = cache(async (tagSlug: string, first = 50) => {
  try {
    const data = await fetchGraphQL<PostsQueryResult>(GET_POSTS, {
      tagName: tagSlug,
      first,
    });
    return data.posts.nodes.map(normalizeCardPost);
  } catch {
    return [];
  }
});

export const getAllSlugs = cache(async () => {
  return fetchGraphQL<AllSlugsResult>(GET_ALL_SLUGS);
});

export const getComments = cache(async (postId: number) => {
  const data = await fetchGraphQL<CommentsResult>(GET_COMMENTS, { postId });
  return data.comments.nodes;
});

export const getRelatedPosts = cache(async (categorySlug: string, excludeId: number, first = 4) => {
  const data = await fetchGraphQL<RelatedPostsResult>(GET_RELATED_POSTS, {
    categoryName: categorySlug,
    first,
  });
  return data.posts.nodes
    .filter((p) => p.databaseId !== excludeId)
    .slice(0, 3)
    .map(normalizeCardPost);
});

export const getMenus = cache(async () => {
  const data = await fetchGraphQL<MenusResult>(GET_MENUS);
  return data.menus.nodes;
});

export const getPageBySlug = cache(async (slug: string) => {
  try {
    const data = await fetchGraphQL<PageBySlugResult>(GET_PAGE_BY_SLUG, { slug });
    return data.page;
  } catch {
    return null;
  }
});

export const getAllPages = cache(async () => {
  const data = await fetchGraphQL<PagesResult>(GET_PAGES);
  return data.pages.nodes;
});

export const searchPosts = cache(async (search: string, first = 20) => {
  try {
    const data = await fetchGraphQL<SearchPostsResult>(SEARCH_POSTS, { search, first });
    return {
      ...data.posts,
      nodes: data.posts.nodes.map((p) => ({
        ...p,
        excerpt: p.excerpt ?? "",
      })),
    };
  } catch {
    return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
});
