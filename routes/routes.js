const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route Model
const Route = require('../models/Route');
const User = require('../models/User');

// Validator
const validateRoute = require('../validation/route');

// @route   GET /routes
// @desc    Get all (public) routes
// @query   country=country_name&city=city_name&type=type_name
// @access  Public
router.get('/', (req, res) => {
  req.errors = {};
  const routeQuery = {};
  const queryFields = ['country', 'city', 'type'];
  for (field of queryFields) {
    if (req.query[field]) routeQuery[field] = req.query[field];
  }

  Route.find(routeQuery)
    .sort({ date: -1 })
    .then(routes => {
      if (!routes) {
        req.errors.noroutes = 'There are no routes';
        return res.status(404).json(req.errors);
      }
      return res.json(routes);
    })
    .catch(err => console.log(err));
});

// FIXME: get the correct query from database
// @route   GET /routes/:id
// @desc    Get routes created by the current user
// @query   country=country_name&city=city_name&type=type_name
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Only let users get their own routes
    if (req.user.id === req.params.id) {
      // { author: { _id: req.param.id } }
      // { title: 'Towards the Frog Lake' }
      // Route
      // .find({ author: { _id: req.params.id, name: 'Arpi' } })
      // .populate('users')
      // .find({ author: { _id: req.params.id, name: 'Arpi' } })
      User.findById(req.params.id)
        .populate('routes', ['title'])
        .then(routes => {
          // routes.sort({ date: -1 });
          res.json(routes);
        })
        .catch(err => console.log(err));
    } else {
      return res.status(403).json({ auth: 'Unauthorized request' });
    }
  }
);

// @route   POST /routes
// @desc    Create or modify a route
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validateRoute,
  (req, res) => {
    const routeData = {};
    const routeFields = [
      'country',
      'city',
      'type',
      'title',
      'description',
      'tags',
      'coords',
      'geometry',
      'thumbnail'
    ];
    for (field of routeFields) {
      if (req.body[field]) routeData[field] = req.body[field];
    }

    routeData.author = {
      _id: req.user.id,
      name: req.user.name
    };

    new Route(routeData).save().then(route => res.json(route));
  }
);

module.exports = router;
