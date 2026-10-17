import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Priyanshu Chamoli | IT Student & Developer",
    short_name: "Priyanshu Chamoli",
    description:
      "IT student and developer from Dehradun, India, exploring networking, cloud computing, Linux, virtual labs, security fundamentals, and software development.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
