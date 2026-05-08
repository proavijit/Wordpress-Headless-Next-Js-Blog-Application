import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Signal Notes",
    short_name: "Signal Notes",
    description: "A modern blog for articles about AI, programming, product design, and software engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf7f1",
    theme_color: "#dcac96",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
