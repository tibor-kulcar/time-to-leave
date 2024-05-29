const webpush = require('web-push');

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey: 'YOUR_PUBLIC_VAPID_KEY',
  privateKey: 'YOUR_PRIVATE_VAPID_KEY',
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Replace this with the subscription object you obtained from the client
const pushSubscription = {
  endpoint: 'SUBSCRIPTION_ENDPOINT',
  keys: {
    auth: 'SUBSCRIPTION_AUTH_KEY',
    p256dh: 'SUBSCRIPTION_P256DH_KEY',
  },
};

const payload = JSON.stringify({
  title: 'Test Notification',
  body: 'This is a test notification',
  icon: '/icon.png',
  data: {
    url: 'https://your-url.com',
  },
});

webpush
  .sendNotification(pushSubscription, payload)
  .then((response: any) => console.log('Notification sent:', response))
  .catch((error: any) => console.error('Error sending notification:', error));
