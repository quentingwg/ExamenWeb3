const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 3
  },
  answer: {
    type: String,
    required: true,
    minlength: 3
  },
  category: {
    type: String,
    required: true,
    minlength: 3
  }
});

// Optionally, if you want to transform the _id to id when converting to JSON
jokeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toHexString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Joke', jokeSchema);
