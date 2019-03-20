const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

// Models
const User = require('../models/User');

// Validators
const validateRegistration = require('../validation/register');
const validateLogin = require('../validation/login');

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/register', validateRegistration, (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      req.errors.email = 'Email is already registered';
      return res.status(400).json(req.errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST /users/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      req.errors.email = 'Email not found';
      return res.status(400).json(req.errors);
    }
    // Checking password
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (isCorrect) {
        payload = {
          id: user._id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1d' },
          (err, token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        req.errors.password = 'Invalid password';
        return res.status(400).json(req.errors);
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      routes: req.user.routes
    });
  }
);

module.exports = router;
