/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com/150",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
