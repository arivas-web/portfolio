import type { NextConfig } from "next";

// En GitHub Pages la web vive en /portfolio; en local o en un dominio propio, en la raíz.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
