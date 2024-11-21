import axios from 'axios';
import { API_URL } from './apiConstants';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/authenticate`, { username, password });
  const token = response.data;
  localStorage.setItem('token', token);
};

export const signup = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  const token = response.data.token;
  localStorage.setItem('token', token);
  alert('Registration successful! Please log in.');
};

