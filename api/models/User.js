const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

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
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
