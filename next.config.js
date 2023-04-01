/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: false,
  // swSrc: '/public/sw.js',
});

// module.exports = withPWA({
//   reactStrictMode: true,
//   experimental: {
//     appDir: true,
//     // fontLoaders: [
//     //   { loader: 'next/font/google', options: { subsets: ['latin'] } },
//     // ],
//   },
// });

module.exports = withPWA({
  reactStrictMode: true,
});
