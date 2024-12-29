import axios from 'axios';

// Create axios instance for TMdb API
const tmdbAxios = axios.create({
    baseURL: 'https://api.themoviedb.org',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
});

export default tmdbAxios;
