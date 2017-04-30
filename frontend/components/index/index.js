import Container from '../container';
import Notification from './notification';
import AddToSlackButton from './add-to-slack-button';
import Thumbnail from './thumbnail';

export default () => (
  <Container>
    <Notification
      avatarUrl="/static/img/dwight@2x.png"
      name="Dwight Shrute"
      time="3:59 PM"
      message="I'm sick of this office thing."
      delay={3}
    />
    <Notification
      avatarUrl="/static/img/donald@2x.png"
      name="The Donald"
      time="4:05 PM"
      message="You're fired!"
      delay={8}
    />
    <Notification
      avatarUrl="/static/img/dwight@2x.png"
      name="Dwight Shrute"
      time="4:06 PM"
      message="Haha, just kidding Don! 🤓"
      delay={13}
    />
    <img className="item logo" src="/static/img/logo-header.svg" alt="logo" />
    <div className="item">
      <h1 className="title title-top">Send snaps in Slack 👻</h1>
      <p className="description">
        Spice up your team’s life & go
        <span className="description-emoji">😂</span>
        <span>by sending disappearing messages in Slack with the </span>
        <strong className="description-command">/slapsnack</strong>
        <span> command.</span>
      </p>
    </div>
    <div className="item add-to-slack-button">
      <AddToSlackButton />
    </div>
    <div className="item">
      <h1 className="title">F**k Productivity! ✊</h1>
      <p className="description">Life is more fun when you live in the moment 😎</p>
    </div>
    <div className="item">
      <div className="thumbnails">
        <Thumbnail src="/static/img/gif1.mp4">
          Just use <strong>/slapsnack</strong> to send useless messages,
          pictures and gifs to your teammates.
          They will disappear after a few seconds!
        </Thumbnail>
        <Thumbnail src="/static/img/gif2.mp4">
          Don’t worry we won’t ever store or re-use your messages mostly because we don’t care
          (and our servers couldn’t handle it).
        </Thumbnail>
        <Thumbnail src="/static/img/gif3.mp4">
          Of course it’s completely free.<br />
          Forever. Promised. Enjoy!
        </Thumbnail>
      </div>
    </div>
    <style jsx>{`
      .item {
        margin: 30px 0;
      }
      .logo {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        padding-top: 40px;
      }
      .title {
        font-size: 58px;
        font-weight: bold;
        color: #f2f2f2;
        text-align: center;
        margin-bottom: 16px;
      }
      .title-top {
        margin-top: 10px;
      }
      .description {
        font-size: 20px;
        color: #b0bcc8;
        text-align: center;
        line-height: 34px;
      }
      .description-emoji {
        margin: 0 8px;
      }
      .description-command {
        color: #f2f2f2;
      }
      .add-to-slack-button {
        background-color: rgba(29, 31, 33, 0.25);
        padding: 20px;
        margin: 0 auto;
        border-radius: 10px;
        margin-top: 40px;
      }
      .thumbnails {
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin: 0 auto;
      }
      @media (max-width: 1200px) {
        .thumbnails {
          flex-direction: column;
          align-items: center;
        }
      }
    `}</style>
  </Container>
);
