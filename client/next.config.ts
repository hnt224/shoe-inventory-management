import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-shoe-inventory-management.s3.us-east-2.amazonaws.com",  // Remove 'https://' from hostname
        port: "",  // Default port is fine
        pathname: "/**",  // This will match all paths within the S3 bucket
      }
    ]
  }
};

export default nextConfig;
