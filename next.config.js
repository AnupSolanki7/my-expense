/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://https://my-expense.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
