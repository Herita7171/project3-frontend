import axios from 'axios';

const client = axios.create({baseURL: 'https://monkfish-app-qpii3.ondigitalocean.app/api'});

export default client;