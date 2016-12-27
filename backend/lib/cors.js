const { FRONTEND_URL: frontendUrl } = process.env;

module.exports = handler => (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', frontendUrl);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return handler(req, res);
};
