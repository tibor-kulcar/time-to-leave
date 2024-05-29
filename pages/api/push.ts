import { NextApiRequest, NextApiResponse } from 'next';
import webPush from 'web-push';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.log(
    'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables. You can use the following ones:'
  );
  console.log(webPush.generateVAPIDKeys());
}

webPush.setVapidDetails(
  'mailto:strapi@noir.studio',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const route = '/api/push'; // Ensure this matches your route

  switch (req.method) {
    case 'GET':
      if (req.query.action === 'vapidPublicKey') {
        res.status(200).send(VAPID_PUBLIC_KEY);
      } else {
        res.status(404).send('Not found');
      }
      break;

    case 'POST':
      if (req.query.action === 'register') {
        res.status(201).send('Registered');
      } else if (req.query.action === 'sendNotification') {
        try {
          const { subscription, payload, ttl } = req.body;
          await webPush.sendNotification(subscription, payload, { TTL: ttl });
          res.status(200).send('Notification sent');
        } catch (error: any) {
          console.error(error.stack);
          res.status(500).send('Notification failed');
        }
      } else {
        res.status(404).send('Not found');
      }
      break;

    default:
      res.status(405).send('Method Not Allowed');
      break;
  }
}
