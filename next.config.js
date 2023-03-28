const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: false,
});

module.exports = withPWA();
