const isEmpty = require('lodash.isempty');
const validator = require('validator');

module.exports = function(req, res, next) {
  req.errors = {};
  let { title, description, tags } = req.body;
  const ignoreWhitespace = { ignore_whitespace: true };

  title = !isEmpty(title) ? title : '';

  // Title
  if (!validator.isLength(title, { min: 4, max: 50 })) {
    req.errors.title = 'Title must be between 4 and 50 characters';
  }
  if (validator.isEmpty(title, ignoreWhitespace)) {
    req.errors.title = 'Title field is required';
  }
  // Description (if provided)
  if (description && !validator.isLength(description, { min: 10, max: 500 })) {
    req.errors.description =
      'Description (if provided) must be between 10 and 500 characters';
  }
  // Tags (if provided)
  if (
    !isEmpty(tags) &&
    !validator.isLength(tags.length.toString(), { max: 10 })
  ) {
    req.errors.tags = 'A maximum of 10 tags are allowed';
  }

  if (!isEmpty(req.errors)) {
    return res.status(404).json(req.errors);
  }

  next();
};
