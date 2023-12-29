/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "picsum.photos",
      "loremflickr.com",
      "drive.google.com",
      "cloudflare-ipfs.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    serverActions: true,
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
