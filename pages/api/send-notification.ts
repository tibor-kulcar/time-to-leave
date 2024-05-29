import type { NextApiRequest, NextApiResponse } from 'next';
import webPush from 'web-push';

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webPush.setVapidDetails(
  'mailto:strapi@noir.studio',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions: Array<webPush.PushSubscription> = []; // Ensure subscriptions are shared across the app

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log('Sending notification with message:', message); // Log for debugging

    const payload = JSON.stringify({
      title: 'Test Notification',
      body: message,
    });

    const sendNotification = async (subscription: webPush.PushSubscription) => {
      try {
        await webPush.sendNotification(subscription, payload);
        console.log('Notification sent to:', JSON.stringify(subscription)); // Log for debugging
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    };

    await Promise.all(subscriptions.map(sendNotification));
    res.status(200).json({ message: 'Notifications sent' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
