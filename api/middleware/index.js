const bodyParser = require('body-parser');
const connectToDatabase = require('./connectToDatabase');
const { asyncErrorHandler } = require('../utils/handlers');

module.exports = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  asyncErrorHandler(connectToDatabase),
];
