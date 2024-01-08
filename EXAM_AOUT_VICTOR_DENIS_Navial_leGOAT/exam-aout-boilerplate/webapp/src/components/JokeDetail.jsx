import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JokesContext } from '../contexts/JokesContext';

const JokeDetail = () => {
  const { getJokeWithScores, addScoreToJoke } = useContext(JokesContext);
  const { id } = useParams();
  const [jokeWithScores, setJokeWithScores] = useState(null);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');

  // Charger la blague et ses scores à chaque changement d'ID
useEffect(() => {
    const jokeData = getJokeWithScores(id);
    if (jokeData !== null) {
        // Trier les scores selon les critères demandés
        // @ts-ignore
        jokeData.scores.sort((a, b) => {
            if (b.score === a.score) {
                return +new Date(b.date) - +new Date(a.date); // Trie par date si les scores sont égaux
            }
            return b.score - a.score; // Trie par score décroissant
        });
    }
    setJokeWithScores(jokeData);
}, [id, getJokeWithScores]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addScoreToJoke(id, username, Number(score));
      setJokeWithScores(getJokeWithScores(id)); // Mise à jour de la liste des scores
      setUsername('');
      setScore('');
    } catch (error) {
      console.error('Erreur lors de l’ajout du score', error);
    }
  };

  return (
    <div>
      {jokeWithScores ? (
        <>
          <h2>Informations sur la blague</h2>
          <p>Catégorie : {jokeWithScores.category}</p>
          <p>Question : {jokeWithScores.question}</p>
          <p>Réponse : {jokeWithScores.answer}</p>
          <p>Score moyen : {jokeWithScores.averageScore}</p>
          <p>Nombre de scores : {jokeWithScores.scoreCount}</p>

          <h2>Liste des scores</h2>
          <ul>
            {jokeWithScores.scores.map((scoreItem) => (
              <li key={scoreItem.id}>
                {scoreItem.username} - Score : {scoreItem.score}
              </li>
            ))}
          </ul>

          <h2>Ajouter un score</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom d'utilisateur :</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Score :</label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
                min="0"
                max="10"
              />
            </div>
            <button type="submit">Ajouter un score</button>
          </form>
        </>
      ) : (
        <p>Blague introuvable</p>
      )}
    </div>
  );
};

export default JokeDetail;
