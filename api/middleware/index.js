const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const connectToDatabase = require('./connectToDatabase');
const passport = require('./passport');
const { asyncErrorHandler } = require('../utils/handlers');

module.exports = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  asyncErrorHandler(connectToDatabase),
  passport.initialize(),
  expressValidator(),
];
