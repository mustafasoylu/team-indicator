import { ReactElement } from 'react';

/**
 * Favicon.
 * @category Component
 */
export const Favicon = (): ReactElement => {
  return (
    <>
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicon/android-chrome-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="stylesheet"
        href="https://fonts.gstatic.com/s/notosansjp/v42/-F62fjtqLzI2JPCgQBnw7HFowAIO2lZ9hg.otf"
      />
      <meta name="apple-mobile-web-app-title" content="Team Indicator" />
      <meta name="application-name" content="Team Indicator" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
};
