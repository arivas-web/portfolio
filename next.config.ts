import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // content/ se lee en tiempo de ejecución desde la ruta del chat
  outputFileTracingIncludes: { "/api/chat": ["./content/**/*"] },
};

export default nextConfig;
