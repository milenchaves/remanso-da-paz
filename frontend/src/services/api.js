import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  config => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export const bibleAPI = {
  getDailyVerse: () => api.get('/api/versiculo-do-dia'),
  
  getBooks: () => api.get('/api/livros'),
  
  getSpecificVerse: (book, chapter, verse) => 
    api.get(`/api/versiculo/${book}/${chapter}/${verse}`),
  
  updateVerse: (data) => api.post('/api/atualizar-versiculo', data)
};

export default api;