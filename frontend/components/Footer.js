import css, { media } from 'next/css';
import Link from 'next/link';

const footer = css({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#fff',
  height: 100,
  fontSize: 12,
  color: '#3c444c',
  display: 'flex',
  alignItems: 'center',
}, media('(max-width: 1200px)', { padding: '20px 0' }));

const footerWrapper = css({
  minWidth: '70%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}, media('(max-width: 1200px)', { flexDirection: 'column' }));

const footerInfo = css({
  display: 'flex',
  alignItems: 'center',
}, media('(max-width: 1200px)', { textAlign: 'center' }));

const footerText = css({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 15,
});

const footerNav = media('(max-width: 1200px)', { marginTop: 20 });

const navLink = css({
  textDecoration: 'none',
  color: '#3c444c',
  margin: '0 5px',
  fontWeight: 'bold',
});

export default () => (
  <div className={footer}>
    <div className={footerWrapper}>
      <div className={footerInfo}>
        <Link href="/">
          <img
            className={css({ width: 40, height: 40 })}
            src="/static/img/logo-footer.svg"
            role="presentation"
          />
        </Link>
        <div className={footerText}>
          <span>© 2016, SlapSnack. No rights reserved.</span>
          <span>Not created by, affiliated with, or supported by Slack Technologies, Inc.</span>
        </div>
      </div>
      <span className={css({ marginLeft: 10 })}>
        Made with <span className={css({ fontSize: 16, margin: '0 4px' })}>❤️</span> by
        <a className={css(navLink, { color: '#40d140' })} href="https://twitter.com/efounders">
          @efounders
        </a>
      </span>
      <nav className={footerNav}>
        <a className={navLink} href="https://www.efounders.co/jobs">Jobs</a>
        <a className={navLink} href="https://www.efounders.co/team">Team</a>
        {/* <a className={navLink} href="https://www.efounders.co/press">Press</a>*/}
        <a className={navLink} href="mailto:slapsnack@efounders.co">Get in touch</a>
      </nav>
    </div>
  </div>
);
