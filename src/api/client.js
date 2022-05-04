import axios from 'axios';

const client = axios.create({baseURL: 'https://hammerhead-app-fmrzr.ondigitalocean.app/api'});

export default client;