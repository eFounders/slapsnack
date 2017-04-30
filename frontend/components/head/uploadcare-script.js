/* eslint-disable react/no-danger */

const UPLOADCARE_PUB_KEY = 'demopublickey';
const uploadcareScript = `UPLOADCARE_PUBLIC_KEY = '${UPLOADCARE_PUB_KEY}';`;

export default () => (
  <script dangerouslySetInnerHTML={{ __html: uploadcareScript }} />
);
