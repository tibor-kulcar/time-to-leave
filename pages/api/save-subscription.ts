import type { NextApiRequest, NextApiResponse } from 'next';
import webPush from 'web-push';

// Replace with your VAPID keys
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webPush.setVapidDetails(
  'http://localhost:3000',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions: Array<webPush.PushSubscription> = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const subscription: webPush.PushSubscription = req.body;
    subscriptions.push(subscription);
    res.status(200).json({ message: 'Subscription saved' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
