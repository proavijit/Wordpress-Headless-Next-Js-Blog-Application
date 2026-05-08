import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    path: "M4 4l7.2 9.6L4.5 20H7l5.3-5.1L16.1 20H20l-7.5-10L18.8 4h-2.5l-4.9 4.7L7.9 4H4Zm3 1.8h1.9L17 18.2h-1.9L7 5.8Z",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1A9.5 9.5 0 0 1 12 6c.8 0 1.6.1 2.4.3 1.9-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.9 8.8H3.7V20h3.2V8.8ZM5.3 7.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM20.3 20v-6.1c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-2.9 1.6V8.8h-3.1V20h3.1v-5.5c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h2.8Z",
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-soft bg-paper px-6 py-16 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <section id="about" aria-labelledby="footer-about">
          <h2 id="footer-about" className="text-sm font-medium text-ink">
            About
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Signal Notes publishes thoughtful writing for people designing and
            shipping modern software.
          </p>
        </section>

        <section aria-labelledby="footer-links">
          <h2 id="footer-links" className="text-sm font-medium text-ink">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition duration-fast hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-social">
          <h2 id="footer-social" className="text-sm font-medium text-ink">
            Social Media
          </h2>
          <div className="mt-4 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                title={social.name}
                className="grid h-9 w-9 place-items-center rounded-xs border border-soft text-muted transition duration-fast hover:border-accent hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="footer-newsletter">
          <h2 id="footer-newsletter" className="text-sm font-medium text-ink">
            Newsletter
          </h2>
          <form className="mt-4 flex gap-2" aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-xs border border-soft bg-card px-3.5 py-2 text-sm text-ink outline-none transition duration-fast placeholder:text-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="rounded-xs bg-accent px-4 py-2 text-sm font-medium text-on-dark transition duration-fast hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Join
            </button>
          </form>
        </section>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-soft pt-6 text-sm text-muted">
        <p>Copyright 2026 Signal Notes. All rights reserved.</p>
      </div>
    </footer>
  );
}
