import PropTypes from 'prop-types';

import Footer from './footer';

const Container = ({ className, children }) => (
  <div className={className}>
    {children}
    <Footer />
    <style jsx>{`
      div {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #3c444c;
        z-index: 1;
        padding-bottom: 120px;
      }
      div.vertically-centered {
        padding-bottom: 0;
        justify-content: center;
      }
      div:before {
        content: '';
        position: absolute;
        background-image: url(/static/img/background.jpg);
        background-size: cover;
        opacity: 0.1;
        z-index: -1;
        width: 100%;
        height: 100%;
      }
      @media (max-width: 1200px) {
        div:before {
          background-position: 46%;
        }
      }
    `}</style>
  </div>
);
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Container.defaultProps = { className: '' };

export default Container;
