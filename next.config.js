/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 images: {
  remotePatterns: [
   {
    protocol: 'https',
    hostname: 'placehold.co',
    port: '',
    pathname: '/**',
   },
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
 },
}

module.exports = nextConfig 