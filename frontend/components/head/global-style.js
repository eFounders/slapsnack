const style = `
html, body {
  margin: 0;
  font-family: Lato, sans-serif;
  overflow-x: hidden;
}
a[href^="https://uploadcare.com"] {
  color: #fff;
}
`;

// eslint-disable-next-line react/no-danger
export default () => <style dangerouslySetInnerHTML={{ __html: style }} />;
