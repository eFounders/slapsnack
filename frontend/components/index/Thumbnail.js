import { PropTypes } from 'react';
import css from 'next/css';

const thumbnail = css({
  width: 316,
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 20px',
});

const thumbnailText = css({
  color: '#f2f2f2',
  textAlign: 'center',
  lineHeight: '26px',
});

const thumbnailImage = css({
  width: '100%',
  border: '3px solid #fff',
  borderRadius: 8,
});

const Thumbnail = ({ src, children }) => (
  <div className={thumbnail}>
    <video className={thumbnailImage} src={src} autoPlay loop />
    <p className={thumbnailText}>{children}</p>
  </div>
);
Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Thumbnail;
