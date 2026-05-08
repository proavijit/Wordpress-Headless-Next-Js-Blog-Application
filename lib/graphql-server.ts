const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; tags?: string[] },
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: options?.revalidate ?? 3600, tags: options?.tags },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }

  return json.data as T;
}
