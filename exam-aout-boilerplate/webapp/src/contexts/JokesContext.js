import React, { useEffect, useState } from "react";
import jokeApi from "services/jokeApi";

const JokesContext = React.createContext({
  jokes: [],
  scores: [],
  getJokeWithScores: (id)=> {}
});

const JokesProvider = (props) => {
  const [jokes, setJokes] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const jokesResponse = await jokeApi.get("/jokes");
        const scoresResponse= await jokeApi.get("/scores");

        setJokes(jokesResponse.data);
        setScores(scoresResponse.data);

      } catch (error) {
        console.log("erreru lors de la recuperation des blagues", error);
      }
    };
    fetchJokes();
  }, []);


  const getJokeWithScores = (id) => {
    const joke = jokes.find(j => j.id === id);
    if (joke) {
      const jokeScores = scores.filter(score => score.joke === id);
      const averageScore = jokeScores.length > 0 
        ? jokeScores.reduce((acc, score) => acc + score.score, 0) / jokeScores.length
        : 0;

      return { 
        ...joke, 
        scores: jokeScores, 
        scoreCount: jokeScores.length, 
        averageScore: parseFloat(averageScore.toFixed(1))
      };
    }
    return null;
  };

  
  return (
    <JokesContext.Provider value={{ jokes, scores, getJokeWithScores }}>
      {props.children}
    </JokesContext.Provider>
  );
};

export { JokesContext, JokesProvider };
