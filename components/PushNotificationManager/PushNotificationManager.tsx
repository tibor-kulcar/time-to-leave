import React, { useEffect, useState } from 'react';
import { usePushNotifications } from '../../hooks/usePushNotifications';

const PushNotificationManager: React.FC = () => {
  const { subscription, subscribeUser, handleSendNotification } =
    usePushNotifications();
  const [state, setState] = useState<{
    id: string;
    interactive: boolean;
    pushEnabled: boolean;
  }>({
    id: 'INITIALISING',
    interactive: false,
    pushEnabled: false,
  });
  const [testMessage, setTestMessage] = useState<string>('Test Notification');

  useEffect(() => {
    if (subscription) {
      console.log('Subscription object:', subscription);
      setState((prevState) => ({
        ...prevState,
        id: 'SUBSCRIBED',
        interactive: true,
        pushEnabled: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        id: 'UNSUBSCRIBED',
        interactive: true,
        pushEnabled: false,
      }));
    }
  }, [subscription]);

  const handleSubscriptionToggle = async () => {
    if (state.pushEnabled) {
      // Unsubscribe logic here
      console.log('Unsubscribe logic not implemented');
    } else {
      await subscribeUser();
    }
  };

  const handleSendTestNotification = async () => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: testMessage }),
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

  return (
    <div>
      <h1>Push Notification Manager</h1>
      <p>Current State: {state.id}</p>
      <p>Subscription: {subscription ? 'Subscribed' : 'Not Subscribed'}</p>
      <button onClick={handleSubscriptionToggle} disabled={!state.interactive}>
        {subscription ? 'Unsubscribe' : 'Subscribe'}
      </button>
      <div>
        <h2>Send Test Notification</h2>
        <input
          type="text"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
        />
        <button onClick={handleSendTestNotification} disabled={!subscription}>
          Send Test Notification
        </button>
      </div>
    </div>
  );
};

export default PushNotificationManager;
