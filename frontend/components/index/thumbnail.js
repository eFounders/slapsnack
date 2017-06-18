/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types';

const Thumbnail = ({ src, children }) =>
  <div className="thumbnail">
    <video className="thumbnail-image" src={src} autoPlay loop />
    <p className="thumbnail-text">{children}</p>
    <style jsx>{`
      .thumbnail {
        width: 316px;
        display: flex;
        flex-direction: column;
        margin: 10px 20px;
      }
      .thumbnail-text {
        color: #f2f2f2;
        text-align: center;
        line-height: 26px;
      }
      .thumbnail-image {
        width: 100%;
        border: 3px solid #fff;
        border-radius: 8px;
      }
    `}</style>
  </div>;
Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Thumbnail;
