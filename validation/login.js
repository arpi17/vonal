const isEmpty = require('lodash.isempty');
const validator = require('validator');

module.exports = function(req, res, next) {
  req.errors = {};
  let { email, password } = req.body;
  const ignoreWhitespace = { ignore_whitespace: true };

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  // Email
  if (!validator.isEmail(email)) {
    req.errors.email = 'Invalid email address';
  }
  if (validator.isEmpty(email, ignoreWhitespace)) {
    req.errors.email = 'Email is required';
  }
  // Password
  if (validator.isEmpty(password)) {
    req.errors.password = 'Password is required';
  }

  if (!isEmpty(req.errors)) {
    return res.status(400).json(req.errors);
  }

  next();
};
