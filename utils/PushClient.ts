// utils/PushClient.ts
class PushClient {
  setState: (state: any) => void;
  setSubscription: (subscription: any) => void;
  publicAppKey: string;
  subscription: any | null;

  constructor(
    setState: (state: any) => void,
    setSubscription: (subscription: any) => void,
    publicAppKey: string
  ) {
    this.setState = setState;
    this.setSubscription = setSubscription;
    this.publicAppKey = publicAppKey;
    this.subscription = null;
  }

  async subscribeDevice(): Promise<void> {
    // Your existing subscription logic
  }

  async unsubscribeDevice(): Promise<void> {
    // Your existing unsubscription logic
  }

  async sendTestNotification(
    subscription: any,
    message: string
  ): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:3000/api/send-notification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription, message }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send test notification');
      }

      console.log('Test notification sent successfully');
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }
}

export { PushClient };
