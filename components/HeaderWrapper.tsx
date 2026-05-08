import { getMenus, getAllCategories } from "@/lib/posts";
import Header from "./Header";
import type { Category } from "@/types/blog";

type NavLink = { label: string; href: string };

export default async function HeaderWrapper() {
  let navLinks: NavLink[] = [];
  let categories: Category[] = [];

  try {
    const [menus, cats] = await Promise.all([
      getMenus(),
      getAllCategories(),
    ]);
    categories = cats;

    const primaryMenu = menus.find((m) => m.name.toLowerCase() === "primary");
    if (primaryMenu) {
      navLinks = primaryMenu.menuItems.nodes.map((item) => {
        let href = item.path;
        if (href.startsWith("/")) href = href;
        else if (!href.startsWith("http")) href = `/${href}`;
        return { label: item.label, href };
      });
    }
  } catch {
    // fall back to default
  }

  return (
    <Header
      navLinks={navLinks.length > 0 ? navLinks : undefined}
      categories={categories}
    />
  );
}
