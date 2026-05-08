import { getMenus } from "@/lib/posts";
import Header from "./Header";

type NavLink = { label: string; href: string };

export default async function HeaderWrapper() {
  let navLinks: NavLink[] = [];

  try {
    const menus = await getMenus();
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
    // fall back to default nav links
  }

  return <Header navLinks={navLinks.length > 0 ? navLinks : undefined} />;
}
