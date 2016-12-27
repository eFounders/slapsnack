import Link from 'next/link';
import css from 'next/css';
import Page from '../components/Page';
import Container from '../components/Container';

export default () => (
  <Page>
    <Container className={css({ paddingBottom: 0, justifyContent: 'center' })}>
      <div className={css({ textAlign: 'center', color: '#f2f2f2' })}>
        <h1>Whoops!</h1>
        <p>Sorry, nothing to be found here...</p>
        <Link href="/">
          <a className={css({ color: '#f2f2f2' })}>
            Get me back to SlapSnack!
          </a>
        </Link>
      </div>
    </Container>
  </Page>
);
