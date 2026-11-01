import axios from 'axios';

export const BASE_URL = '/api';

export const api = axios.create({
   baseURL: BASE_URL,
});
