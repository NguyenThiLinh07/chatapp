import '@/styles/globals.css';
import '../styles/scss/override.antds.scss';
import { StateProvider } from '@/context/StateContext';
import React from 'react';
import Head from 'next/head';
import reducer, { initialState } from '@/context/StateReducers';

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>Chat-app</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </StateProvider>
  );
}
