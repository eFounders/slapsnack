import 'isomorphic-fetch';
import Document, { Main, NextScript } from 'next/document';

import Head from '../components/head';
import Analytics from '../components/analytics';

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </html>
    );
  }
}
