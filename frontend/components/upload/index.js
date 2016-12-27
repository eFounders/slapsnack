/* global fetch */
import 'whatwg-fetch';
import { stringify } from 'querystring';
import { Component, PropTypes } from 'react';
import css, { insertRule, media } from 'next/css';
import uploadcare from 'uploadcare-widget';
import Container from '../Container';

insertRule(`
a[href^="https://uploadcare.com"] {
  color: #fff;
}
`);

const container = css({
  width: '70%',
  margin: '0 auto',
}, media('(max-width: 1200px)', { width: '100%' }));

const placeholder = css({
  textAlign: 'center',
  color: '#f2f2f2',
});

// TODO we need next.js custom webpack config to make it work!
const isDevelopment = false;// process.env.NODE_ENV === 'development';
const backendUrl = isDevelopment ? 'http://localhost:8080' : 'https://backend.slapsnack.com';

export default class extends Component {
  static propTypes = { snapId: PropTypes.string.isRequired };
  state = { placeholderText: 'Loading...' };
  componentDidMount() {
    const panel = uploadcare.openPanel('#uploader-placeholder', null, {
      imagesOnly: true,
      tabs: ['file', 'camera', 'url'],
    });
    panel.done((file) => {
      this.setState({ placeholderText: 'Uploading... you may now go back to Slack!' });
      file.done(({ cdnUrl }) => {
        const queryString = stringify({
          snapId: this.props.snapId,
          cdnUrl,
        });
        fetch(`${backendUrl}/upload?${queryString}`).then(response => response.json()).then(() => {
          setTimeout(() => {
            window.close();
          }, 2 * 1000);
        });
      });
    });
  }
  render() {
    return (
      <Container className={css({ paddingBottom: 0, justifyContent: 'center' })}>
        <div className={container}>
          <div id="uploader-placeholder" className={placeholder}>
            <h1>{this.state.placeholderText}</h1>
          </div>
        </div>
      </Container>
    );
  }
}
