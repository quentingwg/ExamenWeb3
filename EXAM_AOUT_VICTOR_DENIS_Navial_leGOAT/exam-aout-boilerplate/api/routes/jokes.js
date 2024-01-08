const router = require('express').Router();
const Joke = require('../models/Joke'); // Replace with the correct path to your Joke model

// GET /jokes - Retrieve all jokes
router.get('/', async (req, res, next) => {
  try {
    const jokes = await Joke.find({});
    res.json(jokes);
  } catch (error) {
    next(error);
  }
});

// GET /jokes/:id - Retrieve a joke by ID
router.get('/:id', async (req, res, next) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      return res.status(404).send('Joke not found');
    }
    res.json(joke);
  } catch (error) {
    next(error);
  }
});

// POST /jokes - Create a new joke
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.question || req.body.question.length < 3 || 
        !req.body.answer || req.body.answer.length < 3 || 
        !req.body.category || req.body.category.length < 3) {
      return res.status(400).send('Question, answer, and category must be at least 3 characters long');
    }

    const newJoke = new Joke(req.body);
    const savedJoke = await newJoke.save();
    res.status(201).json(savedJoke);
  } catch (error) {
    next(error);
  }
});

// DELETE /jokes/:id - Delete a joke by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const joke = await Joke.findByIdAndDelete(req.params.id);
    if (!joke) {
      return res.status(404).send('Joke not found');
    }
    res.status(200).send('Joke deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
