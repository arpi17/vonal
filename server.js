const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

// Connect to database
const db = require('./config/keys').mongodb;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// // Passport config
require('./config/passport')(passport);

// Application-level middleware
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(morgan('tiny'));
app.use(passport.initialize());

// Router-level middelware
app.use('/users', require('./routes/users'));
app.use('/routes', require('./routes/routes'));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
