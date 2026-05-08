"use client";

import { useCallback, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import type { Comment } from "@/types/blog";

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: number;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!author.trim() || !email.trim() || !content.trim()) return;

      setSubmitting(true);
      setError("");

      try {
        const res = await fetch(WP_GRAPHQL_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              mutation AddComment($postId: Int!, $content: String!, $author: String!, $email: String!) {
                createComment(input: { commentOn: $postId, content: $content, author: $author, authorEmail: $email }) {
                  comment {
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
            `,
            variables: {
              postId,
              content,
              author,
              email,
            },
          }),
        });

        const text = await res.text();
        let json: any;
        try { json = JSON.parse(text); } catch { setError(`Server returned non-JSON: ${text.slice(0, 200)}`); return; }

        if (json.errors) {
          setError(json.errors[0]?.message ?? "Failed to post comment.");
          return;
        }

        if (!json.data?.createComment?.comment) {
          setError("Unexpected response structure.");
          return;
        }

        const newComment: Comment = json.data.createComment.comment;
        setComments((prev) => [...prev, newComment]);
        setAuthor("");
        setEmail("");
        setContent("");
      } catch (err) {
        setError(err instanceof TypeError ? "Network error — cannot reach server." : "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [postId, author, email, content],
  );

  return (
    <section aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="text-2xl font-medium tracking-tight text-ink">
        Comments
      </h2>

      {comments.length > 0 ? (
        <ul className="mt-6 space-y-5" role="list">
          {comments.map((comment) => {
            const authorName = comment.author?.node?.name ?? "Anonymous";
            const initials = authorName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <li
                key={comment.databaseId}
                className="rounded-xs border border-soft bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    src={comment.author?.node?.avatar?.url}
                    initials={initials}
                    className="h-8 w-8"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-ink">
                        {authorName}
                      </span>
                      <time
                        dateTime={comment.date}
                        className="text-xs text-muted"
                      >
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <div
                      className="prose prose-sm mt-2 max-w-none prose-p:leading-7 prose-p:text-muted prose-strong:text-ink"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-muted">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="comment-author" className="block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="comment-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xs border border-soft bg-card px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 transition duration-fast focus:border-accent focus:outline-hidden focus:ring-2 focus:ring-accent/20"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="comment-email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="comment-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xs border border-soft bg-card px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 transition duration-fast focus:border-accent focus:outline-hidden focus:ring-2 focus:ring-accent/20"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment-content" className="block text-sm font-medium text-ink">
            Comment
          </label>
          <textarea
            id="comment-content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1.5 w-full rounded-xs border border-soft bg-card px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 transition duration-fast focus:border-accent focus:outline-hidden focus:ring-2 focus:ring-accent/20"
            placeholder="Share your thoughts..."
          />
        </div>
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xs bg-accent px-5 py-2.5 text-sm font-medium text-on-dark transition duration-fast hover:bg-accent-hover disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>
    </section>
  );
}
