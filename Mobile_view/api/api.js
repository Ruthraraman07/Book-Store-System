import axios from 'axios';

// Create an instance for authentication API
const authAPI = axios.create({
  baseURL: 'http://172.20.10.5:4000/api/auth' // Updated to localhost for emulator testing
});

// Create an instance for book API
const bookAPI = axios.create({
  baseURL: 'http://172.20.10.5:4000/api/books' // Updated to localhost for emulator testing
});

// Authentication functions
export const register = (userData) => authAPI.post('/register', userData);
export const login = (credentials) => authAPI.post('/login', credentials);

// Book functions
export const getBooks = () => bookAPI.get('/');
export const createBook = (formData) => bookAPI.post('/', formData);
export const updateBook = (id, formData) => bookAPI.patch('/' + id, formData);
export const deleteBook = (id) => bookAPI.delete('/' + id);
export const filterBooks = (author) => bookAPI.get('/filter?author=' + author);
