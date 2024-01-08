import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Remplacez par l'URL de votre API

const jokeApi = axios.create({
  baseURL: `${baseURL}/jokes`
});

export default jokeApi;
