import { Paginated } from '../common/types/pagination';
import { handleAxiosError } from '../common/utils/axiosError';
import tmdbAxios from './movie.config';
import { MovieDto, SearchMovieParams } from './movie.dto';

export class MovieService {
    /**
     * Searches for movies using the TMDB API and returns a paginated list of movies.
     *
     * @param {SearchMovieParams} [params] - Optional search parameters to filter the movie search.
     *   The parameters could include things like query string, language, page, and others as supported by the TMDB API.
     *
     * @returns {Promise<Paginated<MovieDto>>} - A promise that resolves to a paginated result containing movie data.
     *
     * @throws {AppError} - If an error occurs while making the request, it is passed to the `handleAxiosError` function
     *   and re-thrown as an `AppError` to be handled further upstream.
     */
    async searchMovies(
        params?: SearchMovieParams,
    ): Promise<Paginated<MovieDto>> {
        try {
            const result = await tmdbAxios.get<Paginated<MovieDto>>(
                '/3/search/movie',
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }
}
