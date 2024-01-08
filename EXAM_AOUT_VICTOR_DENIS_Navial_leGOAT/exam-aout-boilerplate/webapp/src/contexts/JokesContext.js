import React, { createContext, useState, useEffect } from 'react';
import jokeApi from '../services/jokeApi';
import scoreApi from '../services/scoreApi';

// Création du contexte avec des valeurs initiales
export const JokesContext = createContext({
  jokes: [],
  scores: [],
  getJokeWithScores: (id) => {},
  addScoreToJoke: (jokeId, username, score) => {}
});

export const JokesProvider = ({ children }) => {
  const [jokes, setJokes] = useState([]);
  const [scores, setScores] = useState([]);

  // Charger les blagues et les scores depuis l'API au démarrage
  useEffect(() => {
    const fetchJokesAndScores = async () => {
      try {
        const jokesResponse = await jokeApi.get('/');
        const scoresResponse = await scoreApi.get('/');

        setJokes(jokesResponse.data);
        setScores(scoresResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      }
    };

    fetchJokesAndScores();
  }, []);

  // Méthode pour obtenir une blague avec ses scores
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

  const addScoreToJoke = async (jokeId, username, score) => {
    try {
      // Vérifiez que le score est un nombre entre 0 et 10
      if (isNaN(score) || score < 0 || score > 10) {
        throw new Error('Le score doit être un nombre entre 0 et 10');
      }

      // Créez un nouvel objet score à ajouter à la liste des scores
      const newScore = {
        username,
        score: parseFloat(score), // Assurez-vous que le score est de type nombre
        joke: jokeId,
      };

      // Effectuez une requête POST pour ajouter le score à l'API
      const response = await scoreApi.post('/', newScore);

      // Vérifiez la réponse de l'API
      if (response.status === 201) {
        // Ajoutez le nouveau score à la liste des scores
        setScores([...scores, response.data]);
      } else {
        throw new Error('Erreur lors de l\'ajout du score');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du score', error);
      throw error;
    }
  };


return (
    <JokesContext.Provider value={{ jokes, scores, getJokeWithScores, addScoreToJoke }}>
        {children}
    </JokesContext.Provider>
);
};
