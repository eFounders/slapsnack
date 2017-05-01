import PropTypes from 'prop-types';

const Notification = ({ avatarUrl, name, time, message, delay }) => (
  <div className="notification" style={{ animationDelay: `${delay}s` }}>
    <img className="avatar" src={avatarUrl} alt="avatar" />
    <div className="content">
      <div className="title">
        <span className="title-name">{name}</span>
        <span className="title-time">{time}</span>
      </div>
      <div className="content-message">{message}</div>
    </div>
    <style jsx>{`
      @keyframes notification-animation {
        0% {
          transform: translateX(320px);
          visibility: visible;
        }
        20% {
          transform: translateX(0);
        }
        80% {
          transform: translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateY(30px);
          opacity: 0;
        }
      }
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 280px;
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        display: flex;
        animation: notification-animation 4s ease;
        visibility: hidden;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #2c2d30;
      }
      .title {
        display: flex;
        align-items: baseline;
      }
      .title-name {
        font-weight: bold;
        font-size: 14px;
        margin-right: 20px;
      }
      .title-time {
        font-size: 12px;
        opacity: 0.4;
      }
      .content-message {
        font-size: 14px;
      }
    `}</style>
  </div>
);
Notification.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};
/*animation: `4s ease ${delay}s ${animation}`,*/

export default Notification;
