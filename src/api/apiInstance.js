// src/api/apiInstance.js
import axios from 'axios';
import {TMDB_API_KEY, TMDB_BASE_URL} from '@env';

const apiInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
  headers: {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTVhZmQ3YWUxZDBiNWZmMTZjZTExY2U5NjVlMDVmYiIsIm5iZiI6MTY2NTE5ODM5NC44NTIsInN1YiI6IjYzNDBlOTNhYTI4NGViMDA5MTM1Y2FkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YMN2VDYi5TNvvbVdbHjqBY-0Imms2QkvS61mrHFeeCo'}`,
  },
});

export default apiInstance;
