import PropTypes from 'prop-types';
import Link from 'next/link';

import Container from './container';

const Error = ({ message }) => (
  <Container className="vertically-centered">
    <div>
      <h1>Whoops!</h1>
      <p>{message}</p>
      <Link href="/">
        <a>Get me back to SlapSnack!</a>
      </Link>
    </div>
    <style jsx>{`
      div {
        text-align: center;
        color: #f2f2f2;
      }
      a {
        color: #f2f2f2;
      }
    `}</style>
  </Container>
);
Error.propTypes = { message: PropTypes.string.isRequired };

export default Error;
