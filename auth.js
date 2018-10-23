const auth = require('express').Router();

// Validation helpers
const confirmToken          = require('./helpers/validation/confirmToken');
const hashpw                = require('./helpers/validation/hashpw');
const register              = require('./helpers/validation/register');
const signToken             = require('./helpers/validation/signToken');
const validateLoginPassword = require('./helpers/validation/validateLoginPassword');
const validateToken         = require('./helpers/validation/validateToken');


module.exports = auth;

// Token verification
auth.route('/auth')
  .post(validateToken, confirmToken);

// Registration
auth.route('/register')
  .post(hashpw, register, signToken);

// Login
auth.route('/login')
  .post(validateLoginPassword, signToken);