import axios from 'axios';

const client = axios.create({baseURL: 'https://ootd-backend-jl3x4.ondigitalocean.app/api'});

export default client;