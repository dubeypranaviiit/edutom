/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    
        {
        protocol: 'https',
        hostname:   'rukminim2.flixcart.com',
      },
    ],
  },
};

export default nextConfig;
