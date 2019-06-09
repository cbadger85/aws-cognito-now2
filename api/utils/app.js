const app = require('express')();
const middlewares = require('../middleware');

app.use(...middlewares);

module.exports = app;
