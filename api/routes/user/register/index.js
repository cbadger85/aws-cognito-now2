const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      role: req.body.username || 'author',
    });

    const { _id, username, name, password, role } = await User.register(
      newUser,
      req.body.password
    );

    // TODO: add roles

    const user = { _id, username, name, role };

    const token = jwt.sign(user, process.env.SECRET, { expiresIn: 300 });
    const refreshToken = jwt.sign(_id, process.env.SECRET2 + password, {
      expiresIn: '168h',
    });

    return res.json({
      token,
      refreshToken,
      user,
    });
  })
);

app.use(...errorHandlers);

module.exports = app;
