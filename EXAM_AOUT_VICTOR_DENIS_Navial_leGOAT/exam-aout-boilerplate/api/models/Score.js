const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  joke: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joke',
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Virtual for joke's URL
scoreSchema
.virtual('url')
.get(function () {
  return '/api/scores/' + this._id;
});

// Export model
module.exports = mongoose.model('Score', scoreSchema);
