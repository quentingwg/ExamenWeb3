const mongoose= require('mongoose')

const scoreSchema = new mongoose.Schema({
    username: String,
    date: Date,
    score: Number,
    joke: {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: 'Joke',
    }




})

scoreSchema.set('toJson', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports= mongoose.model('Score',scoreSchema)
