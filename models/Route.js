const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  author: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    name: {
      type: String,
      required: true
    }
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
  thumbnailURL: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Route = mongoose.model('routes', RouteSchema);
