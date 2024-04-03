/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'www.dropbox.com' },
      { hostname: 'oldschool.runescape.wiki' },
    ],
  },
  reactStrictMode: true,
  env: {
    CHANNEL_ID: process.env.CHANNEL_ID,
    WEBHOOK: process.env.WEBHOOK
  }
}

module.exports = nextConfig
