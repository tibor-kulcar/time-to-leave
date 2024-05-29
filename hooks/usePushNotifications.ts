import { useState, useEffect } from 'react';

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then((registration) => {
          return registration.pushManager.getSubscription();
        })
        .then((sub) => {
          setSubscription(sub);
          if (sub) {
            // Send subscription to server
            fetch('/api/save-subscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sub),
            });
          }
        })
        .catch((error) => {
          console.error('Error getting push subscription', error);
        });
    }
  }, []);

  const subscribeUser = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_KEY!
          ),
        });
        setSubscription(subscription);
        // Send the subscription object to your server
        await fetch('/api/save-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        console.error('Failed to subscribe the user: ', error);
      }
    }
  };

  const handleSendNotification = async () => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Test Notification' }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Notification sent:', data);
      } else {
        console.error('Error sending notification:', data);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return { subscription, subscribeUser, handleSendNotification };
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
