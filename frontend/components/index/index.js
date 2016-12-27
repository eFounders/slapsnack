import css, { media } from 'next/css';
import Container from '../Container';
import Notification from './Notification';
import AddToSlackButton from './AddToSlackButton';
import Thumbnail from './Thumbnail';

const item = css({ margin: '30px 0' });

const logo = css({
  width: 80,
  height: 80,
  margin: '0 auto',
  paddingTop: 40,
});

const title = css({
  fontSize: 58,
  fontWeight: 'bold',
  color: '#f2f2f2',
  textAlign: 'center',
  marginBottom: 16,
});

const description = css({
  fontSize: 20,
  color: '#b0bcc8',
  textAlign: 'center',
  lineHeight: '34px',
});

const addToSlackButton = css({
  backgroundColor: 'rgba(29, 31, 33, 0.25)',
  padding: 20,
  margin: '0 auto',
  borderRadius: 10,
  marginTop: 40,
});

const thumbnails = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
  margin: '0 auto',
}, media('(max-width: 1200px)', {
  flexDirection: 'column',
  alignItems: 'center',
}));

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
    <img className={css(item, logo)} src="/static/img/logo-header.svg" role="presentation" />
    <div className={item}>
      <h1 className={css(title, { marginTop: 10 })}>Send snaps in Slack 👻</h1>
      <p className={description}>
        Spice up your team’s life & go
        <span className={css({ margin: '0 8px' })}>😂</span>
        <span>by sending disappearing messages in Slack with the </span>
        <strong className={css({ color: '#f2f2f2' })}>/slapsnack</strong>
        <span> command.</span>
      </p>
    </div>
    <div className={css(item, addToSlackButton)}>
      <AddToSlackButton />
    </div>
    <div className={item}>
      <h1 className={title}>F**k Productivity! ✊</h1>
      <p className={description}>Life is more fun when you live in the moment 😎</p>
    </div>
    <div className={item}>
      <div className={thumbnails}>
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
  </Container>
);
