import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: 'https://touropedia-api-agw2.onrender.com',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`; 
  }
  return req;
});

export const login = (formData) => API.post('/api/user/login', formData);
export const register = (formData) => API.post('/api/user/register', formData);
export const googleSignIn = (formData) => API.post('/api/user/googleSignIn', formData);

export const createTour = (tourData) => API.post('/api/tour', tourData);
export const getTours = (page) => API.get(`/api/tour?page=${page}`);
export const getTour = (id) => API.get(`/api/tour/${id}`);
export const getToursByUser = (userId) => API.get(`/api/tour/userTours/${userId}`);
export const deleteTour = (id) => API.delete(`/api/tour/${id}`);
export const updateTour = (updatedTourData, id) => API.patch(`/api/tour/${id}`, updatedTourData);
export const searchTours = (searchQuery) => API.get(`/api/tour/search?searchQuery=${searchQuery}`)
export const getToursByTag = (tag) => API.get(`/api/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/api/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`/api/tour/like/${id}`);