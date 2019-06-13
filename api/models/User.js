const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

// TODO: add role, active to schema
/* 
findByUsername: function(model, queryParameters) {
  queryParameters.active = true;
  return model.findOne(queryParameters);
}
*/

/*

  Role types:
    Admin
    Editor
    Author
*/

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  email: {
    type: String,
    required: 'Please supply an email address',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
  },
  role: {
    type: String,
    required: 'Please supply a role',
    lowercase: true,
  },
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
