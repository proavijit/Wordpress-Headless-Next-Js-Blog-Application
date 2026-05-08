import { getMenus, getAllCategories } from "@/lib/posts";
import Header from "./Header";

type NavLink = { label: string; href: string };
type CategoryLink = { name: string; slug: string; count?: number };

export default async function HeaderWrapper() {
  let navLinks: NavLink[] = [];
  let categories: CategoryLink[] = [];

  try {
    const [menus, cats] = await Promise.all([getMenus(), getAllCategories()]);
    const primaryMenu = menus.find((m) => m.name.toLowerCase() === "primary");
    if (primaryMenu) {
      navLinks = primaryMenu.menuItems.nodes.map((item) => {
        let href = item.path;
        if (href.startsWith("/")) href = href;
        else if (!href.startsWith("http")) href = `/${href}`;
        return { label: item.label, href };
      });
    }
    categories = cats.map((c) => ({ name: c.name, slug: c.slug, count: c.count }));
  } catch {
    // fall back to defaults
  }

  return (
    <Header
      navLinks={navLinks.length > 0 ? navLinks : undefined}
      categories={categories}
    />
  );
}
