import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
// import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { useDarkMode } from 'usehooks-ts';

import manifest from '@/public/manifest.json';
import '@/styles/globals.css';

// const spaceGrotesk = Space_Grotesk({
//   variable: '--font-space-grotesk',
// });
// const spaceMono = Space_Mono({
//   weight: ['400'],
//   variable: '--font-space-mono',
// });

export default function MyApp({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkMode();
  const bgColorBasedOnColorMode = isDarkMode ? '#000' : '#E9E9E9';

  useEffect(() => {
    const manifestElement = document?.getElementById('manifest');
    const manifestString = JSON.stringify({
      ...manifest,
      theme_color: bgColorBasedOnColorMode,
      background_color: bgColorBasedOnColorMode,
    });
    manifestElement?.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' +
        encodeURIComponent(manifestString)
    );
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Time to Leave</title>
        <link rel="manifest" id="manifest" />
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
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="theme-color" content={bgColorBasedOnColorMode} />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/ios-startup.png"
        ></link>
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png"></link>

        <link
          href="/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
      </Head>
      <main
      // className={`${spaceGrotesk.variable} font-sans ${spaceMono.variable} font-mono`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
