/* global fetch */
import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import uploadcare from 'uploadcare-widget';
//
import { BACKEND_URL } from '../../lib/env';
import Container from '../container';

export default class extends Component {
  static propTypes = { snapId: PropTypes.string.isRequired };
  state = { placeholderText: 'Loading…' };
  componentDidMount() {
    const panel = uploadcare.openPanel('#uploader-placeholder', null, {
      imagesOnly: true,
      tabs: ['file', 'camera', 'url'],
    });
    panel.done((file) => {
      this.setState({ placeholderText: 'Uploading… you may now go back to Slack!' });
      file.done(({ cdnUrl }) => {
        fetch(`${BACKEND_URL}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            snapId: this.props.snapId,
            cdnUrl,
          }),
        })
          .then(response => response.json())
          .then(({ ok }) => {
            if (!ok) {
              Router.push('/error');
              return;
            }
            setTimeout(() => {
              window.close();
            }, 2 * 1000);
          });
      });
    });
  }
  render() {
    return (
      <Container style={{ paddingBottom: 0, justifyContent: 'center' }}>
        <div className="uploader-container">
          <div id="uploader-placeholder" className="placeholder">
            <h1>{this.state.placeholderText}</h1>
          </div>
        </div>
        <style jsx>{`
          .uploader-container {
            width: 70%;
            margin: 0 auto;
          }
          .placeholder {
            text-align: center;
            color: #f2f2f2;
          }
          @media (max-width: 1200px) {
            .uploader-container {
              width: 100%;
            }
          }
        `}</style>
      </Container>
    );
  }
}
