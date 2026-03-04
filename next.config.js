/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'dgzzf6k1ibya0.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent-man2-1.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'redefine-me-image-bucket.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig

