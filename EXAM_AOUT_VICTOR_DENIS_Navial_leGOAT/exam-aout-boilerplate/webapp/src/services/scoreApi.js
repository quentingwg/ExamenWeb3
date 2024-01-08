import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Remplacez par l'URL de votre API

const scoreApi = axios.create({
  baseURL: `${baseURL}/scores`
});

export default scoreApi;
