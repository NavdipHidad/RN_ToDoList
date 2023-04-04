import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://localhost:8000/',
  responseType: 'json',
});

export default ApiManager;
