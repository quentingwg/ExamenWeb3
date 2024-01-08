import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useMatch
} from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { JokesContext } from "contexts/JokesContext";
const Jokes = () => {
 const {jokes}= useContext(JokesContext)
  const {scores}= useContext(JokesContext)

  return (
    <div>
        
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Score Count</th>
            <th> Average Score</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => {
            const scoreJoke = scores.filter(score => score.joke === joke._id);
            const averageScore = scoreJoke.length > 0 ? 
              scoreJoke.reduce((sum, score) => sum + score.score, 0) / scoreJoke.length 
              : 0;
            console.log("Joke ID:", joke._id);
            console.log(joke)
            console.log(scoreJoke)
            return (
                <tr>
                <td>
              <li key={joke.id}>
                <Link to={`/jokes/${joke._id}`}> {joke.question} </Link>
              </li>
              </td>
              <td>
              <li >
                {scoreJoke.length} 

              </li>
              </td>
              <td> 
                <li> {averageScore}</li>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Jokes;
