const app = require('../../utils/app');
const { errorHandlers } = require('../../utils/handlers');

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

app.use(...errorHandlers);

module.exports = app;
