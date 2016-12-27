import { Component } from 'react';
import random from 'lodash/random';
import Head from 'next/head';
import { insertRule } from 'next/css';

insertRule(`
html, body {
  margin: 0;
  font-family: "Lato", sans-serif;
  overflow-x: hidden;
}
`);

const description = [
  'SlapSnack brings the fun of Snapchat to Slack.',
  'With the /slapsnack command you can send ephemeral content to individuals ' +
    'or groups through Slack.',
  'Life is more fun when you live in the moment!',
].join(' ');
const title = 'A command for teams who want 👻 in Slack';
const isDevelopment = false;// process.env.NODE_ENV === 'development';
const frontendUrl = isDevelopment ? 'http://localhost:3000' : 'https://slapsnack.com';
const socialUrl = `${frontendUrl}/static/img/social.jpg`;

export default class extends Component {
  state = { title: 'SlapSnack' };
  componentDidMount() {
    setInterval(this.changeTitle, 1000);
  }
  // random emoji code courtesy of @ababol
  changeTitle = () => {
    const emojis = ['🍑', '🌵', '🐷', '🌭', '🍒', '🍩', '🍭', '🐍', '🐙', '😙', '🐱', '🍆'];
    const randomEmoji = emojis[random(0, emojis.length - 1)];
    this.setState({ title: `SlapSnack ${randomEmoji}` });
  };
  render() {
    return (
      <Head>
        <title>{this.state.title}</title>
        <meta name="description" content={description} />
        {/* Required meta tags always come first */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* Facebook meta */}
        <meta property="fb:app_id" content="1701721073472771" />
        <meta property="og:url" content={frontendUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SlapSnack.co" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        {/* Twitter meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@efounders" />
        <meta name="twitter:creator" content="@efounders" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialUrl} />
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/static/img/favicon.png" />
        {/* Lato font */}
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
      </Head>
    );
  }
}
