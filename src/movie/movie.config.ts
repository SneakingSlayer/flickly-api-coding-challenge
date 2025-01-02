import axios from 'axios';

// Create axios instance for TMdb API
const tmdbAxios = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
});

export default tmdbAxios;
