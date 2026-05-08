"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LOGIN = gql`
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

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { loading }] = useMutation(LOGIN);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login({ variables: { username, password } });
      const result = data as { login?: { authToken: string; refreshToken: string } } | null;
      if (result?.login?.authToken) {
        localStorage.setItem("wpAuthToken", result.login.authToken);
        localStorage.setItem("wpRefreshToken", result.login.refreshToken);
        router.push("/");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setError(message);
    }
  }

  return (
    <main id="main-content" className="grid min-h-[70vh] place-items-center bg-paper px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="text-2xl font-medium tracking-tight text-ink">
            Sign in
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Use your WordPress credentials to sign in.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="username"
              label="Username or Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
