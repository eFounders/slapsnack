module.exports = {
  color: '#e40964',
  sendActions: [3, 5, 10].map(value => ({
    name: 'send',
    text: `Send (${value}s)`,
    type: 'button',
    value,
    style: 'primary',
  })),
};
