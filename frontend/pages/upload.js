import PropTypes from 'prop-types';
import { Component } from 'react';
import { parse } from 'url';

import Error from '../components/error';
import Upload from '../components/upload';

export default class extends Component {
  static propTypes = { snapId: PropTypes.string };
  static defaultProps = { snapId: null };
  static getInitialProps = async ({ query }) => ({ snapId: query.id });
  state = { snapId: this.props.snapId };
  componentWillMount() {
    if (!process.browser) {
      return;
    }
    const { query } = parse(window.location.href, true);
    this.setState({ snapId: query.id });
  }
  render() {
    if (this.state.snapId === null) {
      return null;
    }
    if (!this.state.snapId) {
      return <Error message="Missing snap ID 🤔" />;
    }
    return <Upload snapId={this.state.snapId} />;
  }
}
