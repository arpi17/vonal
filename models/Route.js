const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'walking'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: [String],
  coords: Array,
  geometry: {
    type: Object
  },
  thumbnail: {
    URL: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Route = mongoose.model('Route', RouteSchema);
