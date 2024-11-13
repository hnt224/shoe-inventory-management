import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "https://s3-shoe-inventory-management.s3.us-east-2.amazonaws.com",
        port:"",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
