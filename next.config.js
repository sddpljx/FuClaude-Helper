/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ORIGINAL_WEBSITE: "https://sddpljx-fuclaude.hf.space",
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: process.env.ORIGINAL_WEBSITE,
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 