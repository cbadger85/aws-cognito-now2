const app = require('../../utils/app');
const connectToDatabase = require('../../utils/connectToDatabase');

app.get('*', (req, res) => {
  console.log('this is after the db connection');
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
