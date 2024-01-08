import { BrowserRouter as Router, Routes, Route, Link, useMatch } from "react-router-dom";
import React, { useContext, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd'
import Jokes from './Jokes';
import axios from 'axios';
import Scores from './Scores';
import Joke from './Joke';


const { Header, Content } = Layout

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [scores, setScores] = useState([]);

  const addNew = (score) => {
    axios.post("http://localhost:3001/api/scores", {
      username: score.username,  // Ajoutez d'autres champs si nécessaire
      score: score.score,
      date: score.date,
      joke: score.joke,  // Assurez-vous que le champ 'joke' est correct
    })
    .then((response) => {
      // Réponse du serveur après ajout du score
      console.log("Score ajouté avec succès:", response.data);

      // Mise à jour de l'état local des scores
      setScores([...scores, response.data]);
    })
    .catch((error) => {
      console.log("Erreur lors de l'ajout du score:", error);
    });
  }
 

  const match = useMatch('/jokes/:id');
  console.log("match", match)
    const jokeMatched= match ? jokes.find(j=> j._id===match.params.id):null
    console.log(jokeMatched)


  return (
      <div> 
                <Link to="/jokes"> Jokes</Link>
                <Link to = "/scores"> Scores</Link>
                

          <Routes> 
            <Route path= '/jokes' element={<Jokes/>  } />
            <Route path='/jokes/:id' element = {<Joke /> }/> 

            <Route path='/scores' element= {<Scores/> } />

            
          </Routes>
          </div>
      
  )
}

export default App
