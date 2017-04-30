module.exports = (req, res) => {
  res.json({ ts: Date.now(), env: process.env.NODE_ENV });
};
