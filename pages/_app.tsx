'use client';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useDarkMode } from 'usehooks-ts';
import '@/styles/globals.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import PushNotificationManager from '@/components/PushNotificationManager/PushNotificationManager';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkMode();
  const bgColorBasedOnColorMode = isDarkMode ? '#000' : '#FDF9ED';
  const { handleSendNotification } = usePushNotifications();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Registration successful');
        })
        .catch((error) => {
          console.log('Service worker registration failed');
        });
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  useEffect(() => {
    const manifestElement = document?.getElementById('manifest');
    if (manifestElement) {
      const updatedManifest = {
        theme_color: bgColorBasedOnColorMode,
        background_color: bgColorBasedOnColorMode,
      };
      const manifestString = JSON.stringify(updatedManifest);
      manifestElement.setAttribute(
        'href',
        'data:application/json;charset=utf-8,' +
          encodeURIComponent(manifestString)
      );
    }
  }, [bgColorBasedOnColorMode]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Make it to the stop on time" />
        <meta
          name="keywords"
          content="public transportation, arrival, departure, countdown, bus, tram, metro, tube, subway, train, boat"
        />
        <title>Time to Leave</title>
        <link rel="manifest" id="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta name="theme-color" content={bgColorBasedOnColorMode} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/ios-startup.png"
        />
        {/* Additional splashscreens here */}
      </Head>
      <main>
        <Component {...pageProps} />
        <PushNotificationManager />
        <button onClick={handleSendNotification}>Send Notification</button>
      </main>
    </>
  );
}
