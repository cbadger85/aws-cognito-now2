const app = require('express')();
// const passport = require('passport');
// const mongoose = require('mongoose');
const middlewares = require('../middleware');
require('../models/User');

app.use(...middlewares);

// const User = mongoose.model('User');

// passport.use(User.createStrategy());
// move to middleware
// app.use(passport.initialize());

module.exports = app;
