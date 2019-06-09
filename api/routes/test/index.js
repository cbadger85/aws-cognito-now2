const app = require('../../utils/app');
const connectToDatabase = require('../../utils/connectToDatabase');

app.get('*', async (req, res) => {
  await connectToDatabase();
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
