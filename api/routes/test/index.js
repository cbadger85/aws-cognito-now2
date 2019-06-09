const app = require('../../utils/app');

app.get('*', (req, res) => {
  return res.json({
    message: 'Hello World',
  });
});

app.post('*/:example', (req, res) => {
  return res.json({
    message: 'You successfully posted!',
  });
});

module.exports = app;
