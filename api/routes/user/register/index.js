const mongoose = require('mongoose');

const app = require('../../../utils/app');
const { errorHandlers, asyncErrorHandler } = require('../../../utils/handlers');
require('../../../models/User');

const User = mongoose.model('User');

const validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('username', 'You must supply a username!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be blank!').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed Password cannot be blank!')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      error: errors,
    });
  }
  return next();
};

app.post(
  '*',
  validateRegister,
  asyncErrorHandler(async (req, res) => {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
    });
    await User.register(user, req.body.password);
    // TODO: send tokens back
    return res.json({
      message: 'You successfully registered!',
    });
  })
);

app.use(...errorHandlers);

module.exports = app;
