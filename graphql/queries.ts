export const POST_FIELDS = `
  databaseId
  slug
  title
  excerpt
  content
  date
  modified
  author {
    node {
      databaseId
      name
      slug
      avatar {
        url
      }
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  categories {
    nodes {
      databaseId
      name
      slug
    }
  }
  tags {
    nodes {
      databaseId
      name
      slug
    }
  }
`;

export const POST_FIELDS_CARD = `
  databaseId
  slug
  title
  excerpt
  date
  modified
  author {
    node {
      databaseId
      name
      slug
      avatar {
        url
      }
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  categories {
    nodes {
      databaseId
      name
      slug
    }
  }
  tags {
    nodes {
      databaseId
      name
      slug
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int, $after: String, $categoryName: String, $tagName: String, $authorName: String, $search: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $categoryName
        tag: $tagName
        authorName: $authorName
        search: $search
      }
    ) {
      nodes {
        ${POST_FIELDS_CARD}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      nodes {
        databaseId
        name
        slug
        count
      }
    }
  }
`;

export const GET_TAGS = `
  query GetTags {
    tags {
      nodes {
        databaseId
        name
        slug
        count
      }
    }
  }
`;

export const GET_AUTHORS = `
  query GetAuthors {
    users {
      nodes {
        databaseId
        name
        slug
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($slug: ID!, $first: Int) {
    category(id: $slug, idType: SLUG) {
      databaseId
      name
      slug
      description
      posts(first: $first) {
        nodes {
          ${POST_FIELDS_CARD}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_POSTS_BY_AUTHOR = `
  query GetPostsByAuthor($slug: ID!, $first: Int) {
    user(id: $slug, idType: SLUG) {
      databaseId
      name
      slug
      avatar {
        url
      }
      description
      posts(first: $first) {
        nodes {
          ${POST_FIELDS_CARD}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_COMMENTS = `
  query GetComments($postId: Int!) {
    comments(where: { commentOn: $postId, order: ASC, orderby: COMMENT_DATE }) {
      nodes {
        databaseId
        content
        date
        author {
          node {
            name
            avatar { url }
          }
        }
      }
    }
  }
`;

export const GET_RELATED_POSTS = `
  query GetRelatedPosts($categoryName: String!, $first: Int) {
    posts(first: $first, where: { categoryName: $categoryName }) {
      nodes {
        ${POST_FIELDS_CARD}
      }
    }
  }
`;

export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(first: 100) {
      nodes {
        slug
        modified
      }
    }
    categories {
      nodes {
        slug
      }
    }
    users {
      nodes {
        slug
      }
    }
    pages(first: 100) {
      nodes {
        slug
        date
      }
    }
  }
`;

export const GET_MENUS = `
  query GetMenus {
    menus {
      nodes {
        id
        name
        menuItems {
          nodes {
            label
            path
            target
            parentId
          }
        }
      }
    }
  }
`;

export const GET_PAGES = `
  query GetPages {
    pages {
      nodes {
        databaseId
        slug
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int) {
    posts(first: $first, where: { search: $search }) {
      nodes {
        title
        slug
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
