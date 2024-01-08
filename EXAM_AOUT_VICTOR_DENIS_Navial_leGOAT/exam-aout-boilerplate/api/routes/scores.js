const router = require('express').Router();
const Score = require('../models/Score'); // Corrected path to Score model
const Joke = require('../models/Joke'); // Corrected path to Joke model

// GET /scores - Retrieve all scores
router.get('/', async (req, res, next) => {
  try {
    const scores = await Score.find({}).populate('joke');
    res.json(scores);
  } catch (error) {
    next(error);
  }
});

// POST /scores - Create a new score
router.post('/', async (req, res, next) => {
  try {
    // Check if the joke exists
    const jokeExists = await Joke.exists({ _id: req.body.joke });
    if (!jokeExists) {
      return res.status(404).send('Joke not found');
    }

    // Validate the username and check if a score for this joke by this user already exists
    if (req.body.username.length < 3) {
      return res.status(400).send('Username must be at least 3 characters long');
    }

    const scoreGiven = await Score.findOne({
      joke: req.body.joke,
      username: req.body.username,
    });
    if (scoreGiven) {
      return res.status(400).send('User has already scored this joke');
    }

    // Create and save the new score
    const newScore = new Score(req.body);
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
