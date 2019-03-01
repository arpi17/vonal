const isEmpty = require('lodash.isempty');
const validator = require('validator');

module.exports = function(req, res, next) {
  req.errors = {};
  let { name, email, password, password2 } = req.body;
  const ignoreWhitespace = { ignore_whitespace: true };

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  password2 = !isEmpty(password2) ? password2 : '';

  // Name
  if (!validator.isLength(name, { min: 4, max: 30 })) {
    req.errors.name = 'Name must be between 4 and 30 characters';
  }
  if (validator.isEmpty(name, ignoreWhitespace)) {
    req.errors.name = 'Name is required';
  }
  // Email
  if (!validator.isEmail(email)) {
    req.errors.email = 'Invalid email address';
  }
  if (validator.isEmpty(email, ignoreWhitespace)) {
    req.errors.email = 'Email is required';
  }
  // Password
  if (!validator.isAlphanumeric(password)) {
    req.errors.password = 'Password can only contain letters and numbers';
  }
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    req.errors.password = 'Password must be between 6 and 30 characters';
  }
  if (validator.isEmpty(password, ignoreWhitespace)) {
    req.errors.password = 'A password is required';
  }
  // Password Again
  if (password2 !== password) {
    req.errors.password2 = 'The passwords are not the same';
  }
  if (validator.isEmpty(password2, ignoreWhitespace)) {
    req.errors.password2 = 'You must confirm your password';
  }

  if (!isEmpty(req.errors)) {
    return res.status(400).json(req.errors);
  }

  next();
};
