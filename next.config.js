/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'scontent.fbga3-1.fna.fbcdn.net'],
  },
}

module.exports = nextConfig
