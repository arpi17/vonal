if (process.env.NODE_ENV === 'production') {
  module.exports = require('./accessToken_prod');
} else {
  module.exports = require('./accessToken_dev');
}
