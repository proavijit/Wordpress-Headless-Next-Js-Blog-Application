export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        databaseId
        name
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($username: String!, $email: String!, $password: String!) {
    registerUser(input: { username: $username, email: $email, password: $password }) {
      user {
        databaseId
        name
        email
      }
    }
  }
`;

export const ADD_COMMENT_MUTATION = `
  mutation AddComment($postId: Int!, $content: String!, $author: String!, $email: String!) {
    createComment(
      input: {
        commentOn: $postId
        content: $content
        author: $author
        authorEmail: $email
      }
    ) {
      comment {
        databaseId
        content
        date
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;
