import { Paginated } from '../common/types/pagination';
import { handleAxiosError } from '../common/utils/axiosError';
import tmdbAxios from './movie.config';
import {
    GetMovieByIdDto,
    GetMovieQuery,
    SearchMovieDto,
    SearchMovieQuery,
} from './movie.dto';

export class MovieService {
    /**
     * Searches for movies using the TMDB API and returns a paginated list of movies.
     *
     * @param {SearchMovieQuery} [params] - Optional search parameters to filter the movie search.
     *   The parameters could include things like query string, language, page, and others as supported by the TMDB API.
     *
     * @returns {Promise<Paginated<SearchMovieDto>>} - A promise that resolves to a paginated result containing movie data.
     *
     * @throws {AppError} - If an error occurs while making the request, it is passed to the `handleAxiosError` function
     *   and re-thrown as an `AppError` to be handled further upstream.
     */
    async searchMovies(
        params?: SearchMovieQuery,
    ): Promise<Paginated<SearchMovieDto>> {
        try {
            const result = await tmdbAxios.get<Paginated<SearchMovieDto>>(
                '/3/search/movie',
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Fetches movie details from the TMDB API.
     *
     * @param {number} id - The ID of the movie to fetch.
     * @param {GetMovieQuery} params - The query parameters for the request (e.g., include_details).
     * @returns {Promise<any>} - The data returned from the TMDB API.
     *
     * @throws {Error} - Throws an error if the request fails.
     */
    async getMovieById(
        id: number,
        params: GetMovieQuery,
    ): Promise<GetMovieByIdDto> {
        try {
            const result = await tmdbAxios.get(`/3/movie/${id}`, { params });
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }
}
