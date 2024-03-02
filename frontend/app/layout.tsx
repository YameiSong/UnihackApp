// app/Layout.tsx
import Head from 'next/head';
import "./globals.css";
import React from 'react'; 

export default function RootLayout() {
  return (
    <div>
      <Head>
        <meta name="description" content="Transit Track App" />
      </Head>
      <main>
        <h1>Welcome to use Transit Track</h1>
      </main>
    </div>
  );
}
