/* eslint-disable react/no-danger */
import { Component, PropTypes } from 'react';
import Head from 'next/head';
import Error from './_error';
import Page from '../components/Page';
import Upload from '../components/upload';

const uploadcareScript = 'UPLOADCARE_PUBLIC_KEY = \'demopublickey\';';

export default class extends Component {
  static propTypes = { id: PropTypes.string.isRequired };
  static getInitialProps = async ({ query }) => query;
  render() {
    if (!this.props.id) {
      return <Error />;
    }
    return (
      <Page>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: uploadcareScript }} />
        </Head>
        <Upload snapId={this.props.id} />
      </Page>
    );
  }
}
