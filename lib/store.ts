import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  searchHistory: string[];
  addSearch: (q: string) => void;
  clearSearchHistory: () => void;
  recentPosts: number[];
  trackPostView: (id: number) => void;
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (t) => {
        document.documentElement.classList.toggle("dark", t === "dark");
        set({ theme: t });
      },
      toggleTheme: () =>
        set((s) => {
          const next = s.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark", next === "dark");
          return { theme: next };
        }),
      searchHistory: [],
      addSearch: (q) =>
        set((s) => ({
          searchHistory: [q, ...s.searchHistory.filter((x) => x !== q)].slice(
            0,
            10
          ),
        })),
      clearSearchHistory: () => set({ searchHistory: [] }),
      recentPosts: [],
      trackPostView: (id) =>
        set((s) => ({
          recentPosts: [id, ...s.recentPosts.filter((x) => x !== id)].slice(
            0,
            20
          ),
        })),
      bookmarks: [],
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((x) => x !== id)
            : [...s.bookmarks, id],
        })),
    }),
    { name: "sn-store", partialize: (s) => ({ theme: s.theme, searchHistory: s.searchHistory, bookmarks: s.bookmarks }) },
  ),
);
