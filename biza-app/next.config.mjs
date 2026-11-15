/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000" }]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/scam-warnings",
        destination: "/scam-radar",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/courses/dropshipping",
        destination: "/courses/selling-online/dropshipping",
        permanent: true,
      },
      {
        source: "/courses/print-on-demand",
        destination: "/courses/selling-online/print-on-demand",
        permanent: true,
      },
      {
        source: "/courses/affiliate-marketing",
        destination: "/courses/marketing-partnerships",
        permanent: true,
      },
      {
        source: "/courses/writing-transcription",
        destination: "/courses/freelancing-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
