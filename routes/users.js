const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

// Models
const User = require('../models/User');
const Route = require('../models/Route');

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

// @route   GET /users/myroutes/:id
// @desc    Get routes created by the current user
// @access  Private
router.get(
  '/myroutes/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Only let users get their own routes
    if (req.user.id === req.params.id) {
      User.findById(req.params.id)
        .populate('routes')
        .then(user => {
          res.json(user.routes);
        })
        .catch(err => console.log(err));
    } else {
      return res.status(403).json({ unauthorized: 'Unauthorized request' });
    }
  }
);

// @route   GET /users/saved
// @desc    Get saved routes
// @access  Private
router.get(
  '/saved',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .populate({ path: 'saved', populate: { path: 'author' } })
      .then(user => {
        // Check if route still exists
        user.saved = user.saved.filter(route => Route.findById(route._id));
        // FIXME: removed route still persists in db
        user.save().then(user => {
          res.json(user.saved);
        });
      })
      .catch(err => console.log(err));
  }
);

// @route   PUT /users/saved/:id
// @desc    Save a route to collection
// @access  Private
router.put(
  '/saved/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Route.findById(req.params.id).then(route => {
      if (!route) {
        return res.status(404).json({ notfound: 'Route not found' });
      }
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { saved: route._id } },
        { new: true }
      ).then(user => {
        res.json(user);
      });
    });
  }
);

// @route   DELETE /users/saved/:id
// @desc    Delete a route from collection
// @access  Private
router.delete(
  '/saved/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Route.findById(req.params.id).then(route => {
      if (!route) {
        return res.status(404).json({ notfound: 'Route not found' });
      }
      User.findByIdAndUpdate(
        req.user.id,
        { $pull: { saved: req.params.id } },
        { new: true }
      )
        .then(user => {
          res.json(user);
        })
        .catch(err => console.log(err));
    });
  }
);

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
