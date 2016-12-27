import { PropTypes } from 'react';
import Head from './Head';
import Analytics from './Analytics';

const Page = ({ children }) => (
  <div>
    <Head />
    {children}
    <Analytics />
  </div>
);
Page.propTypes = { children: PropTypes.node.isRequired };

export default Page;
