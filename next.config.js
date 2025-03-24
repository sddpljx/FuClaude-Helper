/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ORIGINAL_WEBSITE: "https://sddpljx-fuclaude.hf.space",
  },
  publicRuntimeConfig: {
    ORIGINAL_WEBSITE: process.env.NEXT_PUBLIC_ORIGINAL_WEBSITE || "https://sddpljx-fuclaude.hf.space",
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