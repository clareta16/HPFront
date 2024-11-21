import axios from 'axios';
import { API_URL } from './apiConstants';

// Creem una instància d'axios per a que es pugui configurar de forma global
const axiosInstance = axios.create({
  baseURL: API_URL // Base URL per a les peticions
});

// Afegim un interceptor per incloure el token a totes les peticions
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtenim el token de localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Afegim el token als encapçalaments
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;