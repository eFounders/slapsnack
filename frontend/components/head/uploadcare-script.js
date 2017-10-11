const UPLOADCARE_PUB_KEY = 'demopublickey';
const script = `
UPLOADCARE_PUBLIC_KEY = '${UPLOADCARE_PUB_KEY}';
`;

// eslint-disable-next-line react/no-danger
export default () => <script dangerouslySetInnerHTML={{ __html: script }} />;
