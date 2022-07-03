import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

// Accounts Routes
export const login = (formData) => API.get('/accounts/login', formData);
export const signup = (formData) => API.put('/accounts/signup', formData);
export const addWallet = (formData) =>
  API.put('/accounts/add/wallet', formData);

// Citizen Routes
export const getCitizens = (formData) => API.get('/citizens/', formData);
// export const addCitizen = (formData) =>
//   API.post('/accounts/add/citizen', formData);
