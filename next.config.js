/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: false,
});

//  Google fonts setup
// module.exports = withPWA({
//   reactStrictMode: true,
//   experimental: {
//     appDir: true,
//     // fontLoaders: [
//     //   { loader: 'next/font/google', options: { subsets: ['latin'] } },
//     // ],
//   },
// });
//  END Google fonts setup

module.exports = withPWA({
  reactStrictMode: true,
});
