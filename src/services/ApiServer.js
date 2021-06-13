import axios from 'axios';

const ApiServer = axios.create({
  baseURL: 'http://localhost:3333',
});

export default ApiServer;
