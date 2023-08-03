/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'alh3.googleusercontent.com',
            port: '',
            pathname: '/search',
          },
        ],
    },
}

module.exports = nextConfig
