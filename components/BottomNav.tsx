"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search, Bookmark } from "lucide-react";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Journal", href: "/blog", icon: BookOpen },
  { label: "Search", href: "/search", icon: Search },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-soft bg-paper/95 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xs transition-colors duration-fast ${
                isActive ? "text-accent" : "text-muted/60 hover:text-muted"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
