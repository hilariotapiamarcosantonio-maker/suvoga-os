/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Scoped allow-list for externally hosted course covers (Google Drive).
    // No global wildcard — only the specific hosts that serve Drive images.
    // Kept ready for when covers are promoted to "definitive" via Drive links;
    // current covers are local images or the premium editorial fallback.
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
