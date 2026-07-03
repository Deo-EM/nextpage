import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出，适配 Cloudflare Pages 部署
  output: "export",
  images: {
    // 静态导出不支持 Next.js 图片优化
    unoptimized: true,
  },
};

export default nextConfig;
