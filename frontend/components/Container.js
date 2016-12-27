import { PropTypes } from 'react';
import css, { media } from 'next/css';
import Footer from './Footer';

const container = css({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#3c444c',
  zIndex: 1,
  paddingBottom: 120,
  ':before': {
    content: '""',
    position: 'absolute',
    backgroundImage: 'url("/static/img/background.jpg")',
    backgroundSize: 'cover',
    opacity: 0.1,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
}, media('(max-width: 1200px)', {
  ':before': {
    backgroundPosition: '46%',
  },
}));

const Container = ({ className, children }) => (
  <div className={css(container, className)}>
    {children}
    <Footer />
  </div>
);
Container.propTypes = {
  className: PropTypes.shape(),
  children: PropTypes.node.isRequired,
};

export default Container;
