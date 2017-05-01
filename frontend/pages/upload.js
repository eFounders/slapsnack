import { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../components/error';
import Upload from '../components/upload';

export default class extends Component {
  static propTypes = { id: PropTypes.string.isRequired };
  static getInitialProps = async ({ query }) => query;
  render() {
    if (!this.props.id) {
      return <Error message="Missing snap ID :(" />;
    }
    return <Upload snapId={this.props.id} />;
  }
}
