const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
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
    .populate('author', 'name')
    .sort({ date: -1 })
    .then(routes => {
      if (!routes) {
        return res.status(404).json({ noroutes: 'There are no routes' });
      }
      return res.json(routes);
    })
    .catch(err => console.log(err));
});

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

    routeData.author = req.user.id;

    // Create new route and save its reference to the 'User' model
    new Route(routeData).save().then(route => {
      User.findByIdAndUpdate(req.user.id, {
        $push: { routes: route._id }
      }).then(() => res.json(route));
    });
  }
);

// TEST: removing others' routes
// @route   DELETE /routes/:id
// @desc    Delete a route completely
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Route.findById(req.params.id)
      .then(route => {
        // Only let users to delete their own routes
        if (route.author !== req.user.id) {
          route.remove();
          // Remove the route from the "My routes" collection too
          User.findById(req.user.id).then(user => {
            const removeIndex = user.routes.indexOf(req.params.id);
            user.routes.splice(removeIndex, 1);
            user.save().then(user => res.json(user));
          });
        } else {
          return res.status(403).json({
            unauthorized: 'You are not authorized to delete this route'
          });
        }
      })
      .catch(err => res.status(404).json({ notfound: 'Route not found' }));
  }
);

module.exports = router;
