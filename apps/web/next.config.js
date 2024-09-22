/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/konsers/search',
                destination: 'http://localhost:8000/api/konsers/search',
            },
        ]
    },
}

module.exports = nextConfig
