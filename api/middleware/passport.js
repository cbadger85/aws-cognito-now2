const passport = require('passport');
const mongoose = require('mongoose');

require('../models/User');

const User = mongoose.model('User');

passport.use(User.createStrategy());

module.exports = passport;
