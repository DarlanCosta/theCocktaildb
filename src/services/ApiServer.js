import axios from 'axios';

const ApiServer = axios.create({
  baseURL: 'http://54.156.231.223:3333',
});

export default ApiServer;
