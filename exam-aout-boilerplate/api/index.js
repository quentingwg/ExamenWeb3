const { MONGODB_URI, PORT, DB_NAME } = require('./utils/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middlewares = require('./utils/middlewares');
const { createDbWithData } = require('./utils/db-creation');
const { asyncStartMongMemoryServer } = require('./utils/mongo-memory-server');
const { default: allJokes } = require('./routes/jokes');
const Joke = require('./models/Joke')
const Score= require('./models/Score')


const startAsyncDbWork = async () => {
  try {
    if (!MONGODB_URI) {
      const mongoMemoryServer = await asyncStartMongMemoryServer();
      await createDbWithData(mongoMemoryServer);
      // Connect to database
      await mongoose.connect(mongoMemoryServer.getUri(), {
        dbName: DB_NAME ?? 'exam-web3',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to database via Mongoose');
      return;
    }

    // Connect to database
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME ?? 'exam-web3',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database via Mongoose');
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
};


startAsyncDbWork();




// Create server
const app = express();

// Init server
app.use(cors());
app.use(express.json());
app.use(middlewares.logger);

app.use(middlewares.errorHandler);

// Start server
app.listen(PORT ?? 3001, () => {
  console.log(`Server running on port ${PORT ?? 3001}`);
});



app.get('/api/jokes',(request,response)=> {
  Joke.find({}).then(jokes=> {
    response.json(jokes)
  })
})


app.post('/api/jokes', (request,response)=> {
  const body= request.body;
  if(body.question.length<3 ) return response.status(400).json({error: "la question est trop courte"})
  const joke= new Joke({
    question: body.question,
    answer: body.answer,
    category: body.category
  })
  joke.save().then(joke=> {
    response.json(joke)
  })
})

app.delete('/api/jokes/:id',(request,response)=> {
  const id = request.params.id;
  Joke.remove({_id:id}).then(joke=>{
    response.json(joke);
})
})

app.get('/api/jokes/:id',(request,response)=> {
  const id = request.params.id;
  Joke.findById(id).then(joke=> {
    response.json(joke)
  })

})

app.get('/api/scores', (request,response)=> {
  Score.find({}).then(jokes=> {
    response.json(jokes)
  })
})

app.post('/api/scores',async (request, response)=> {
  const body= request.body
  const blague=  await Joke.findById(body.joke)
if(!blague) return response.status(400).json({error: "la blague nexisste pas"})
  const newScore=new Score({
    username:body.username,
    score:body.score,
    date:body.date,
    joke:body.joke
  })
  const savedScore = await newScore.save();

    response.json(savedScore);
})







