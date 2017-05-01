import PropTypes from 'prop-types';
import Footer from './Footer';

const Container = ({ style, children }) => (
  <div style={style}>
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
  style: PropTypes.shape(),
  children: PropTypes.node.isRequired,
};
Container.defaultProps = { style: {} };

export default Container;
