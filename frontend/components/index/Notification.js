import { PropTypes } from 'react';
import css, { keyframes } from 'next/css';

const animation = keyframes({
  '0%': { transform: 'translateX(320px)', visibility: 'visible' },
  '20%': { transform: 'translateX(0)' },
  '80%': { transform: 'translateY(0)', opacity: 1 },
  '100%': { transform: 'translateY(30px)', opacity: 0 },
});

const notification = delay => css({
  position: 'fixed',
  top: 20,
  right: 20,
  width: 280,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 4,
  display: 'flex',
  animation: `4s ease ${delay}s ${animation}`,
  visibility: 'hidden',
});

const avatar = css({
  width: 40,
  height: 40,
  marginRight: 10,
});

const content = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: '#2c2d30',
});

const title = css({
  display: 'flex',
  alignItems: 'baseline',
});

const Notification = ({ avatarUrl, name, time, message, delay }) => (
  <div className={notification(delay)}>
    <img className={avatar} src={avatarUrl} role="presentation" />
    <div className={content}>
      <div className={title}>
        <span className={css({ fontWeight: 'bold', fontSize: 14, marginRight: 20 })}>{name}</span>
        <span className={css({ fontSize: 12, opacity: 0.4 })}>{time}</span>
      </div>
      <div className={css({ fontSize: 14 })}>{message}</div>
    </div>
  </div>
);
Notification.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default Notification;
