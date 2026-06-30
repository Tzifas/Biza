/** @type {import('next').NextConfig} */
const nextConfig = {
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
