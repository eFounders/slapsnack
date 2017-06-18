import Link from 'next/link';

export default () =>
  <div className="footer">
    <div className="footer-wrapper">
      <div className="footer-info">
        <Link href="/">
          <img src="/static/img/logo-footer.svg" alt="logo" />
        </Link>
        <div className="footer-text">
          <span>© 2017, SlapSnack. No rights reserved.</span>
          <span>Not created by, affiliated with, or supported by Slack Technologies, Inc.</span>
        </div>
      </div>
      <span className="footer-credits">
        Made with <span className="heart" role="img" aria-label="heart">❤️</span> by
        <a href="https://twitter.com/efounders">@efounders</a>
      </span>
      <nav>
        <a href="https://www.efounders.co/jobs">Jobs</a>
        <a href="https://www.efounders.co/team">Team</a>
        <a href="mailto:slapsnack@efounders.co">Get in touch</a>
      </nav>
    </div>
    <style jsx>{`
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        height: 80px;
        font-size: 12px;
        color: #3c444c;
        display: flex;
        align-items: center;
      }
      .footer-wrapper {
        min-width: 70%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .footer-info {
        display: flex;
        align-items: center;
      }
      .footer-text {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
      }
      img {
        width: 40px;
        height: 40px;
      }
      .footer-credits {
        margin-left: 10px;
      }
      .footer-credits span {
        font-size: 16px;
        margin: 0 4px;
      }
      .footer-credits a {
        color: #40d140;
      }
      a {
        text-decoration: none;
        color: #3c444c;
        margin: 0 5px;
        font-weight: bold;
      }
      @media (max-width: 1200px) {
        .footer {
          padding: 20px 0;
        }
        .footer-wrapper {
          flex-direction: column;
        }
        .footer-info {
          text-align: center;
        }
        nav {
          margin-top: 20px;
        }
      }
    `}</style>
  </div>;
