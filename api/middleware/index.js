const bodyParser = require('body-parser');
const connectToDatabase = require('./connectToDatabase');

module.exports = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  connectToDatabase,
];
