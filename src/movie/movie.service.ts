import { Paginated } from '../common/types/pagination';
import { handleAxiosError } from '../common/utils/axiosError';
import tmdbAxios from './movie.config';
import {
    GetMovieByIdDto,
    GetMovieQuery,
    SearchMovieDto,
    SearchMovieQuery,
    GetTrendingMoviesQuery,
    GetMovieGenresQuery,
    MovieGenreDto,
    MovieListsQuery,
} from './movie.dto';

export class MovieService {
    /**
     * Fetches a list of popular movies from the TMDB API.
     *
     * @param {MovieListsQuery} params - The query parameters used to filter or paginate the list of popular movies. This object should conform to the `MovieListsQuery` type.
     *
     * @returns {Promise<Paginated<SearchMovieDto>>} A promise that resolves to a paginated list of popular movies.
     * The response will contain the data of the movies in the form of a `SearchMovieDto` array, and pagination details such as the current page, total pages, etc.
     *
     * @throws {Error} Will throw an error if the request to the TMDB API fails, which is handled by the `handleAxiosError` function.
     */
    async getPopularMovies(
        params: MovieListsQuery,
    ): Promise<Paginated<SearchMovieDto>> {
        try {
            const result = await tmdbAxios.get<Paginated<SearchMovieDto>>(
                `/3/movie/popular`,
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Fetches the list of movie genres from the TMDB API.
     *
     * @param {GetMovieGenresQuery} params - The query parameters for the request.
     *  - `language`: The language in which the movie genres should be returned (e.g., 'en', 'es').
     *
     * @returns {Promise<MovieGenreDto>} A promise that resolves to the list of movie genres
     *  in the form of a `MovieGenreDto` object, containing an array of genres.
     *
     * @throws {Error} If the API request fails, an error is thrown after handling it.
     */
    async getMovieGenres(
        params: GetMovieGenresQuery,
    ): Promise<{ genres: MovieGenreDto[] }> {
        try {
            const result = await tmdbAxios.get<{ genres: MovieGenreDto[] }>(
                `/3/genre/movie/list`,
                {
                    params: {
                        language: params.language,
                    },
                },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Fetches a list of trending movies from the TMDB API based on the specified time window and language.
     *
     * @param {GetTrendingMoviesQuery} params - The query parameters used to fetch trending movies.
     *
     * @returns {Promise<any>} A promise that resolves to the data containing the trending movies returned by the API.
     * The shape of the data depends on the TMDB API response.
     *
     * @throws {Error} If an error occurs during the HTTP request, the error is passed to the `handleAxiosError` function
     * and then rethrown.
     */
    async getTrendingMovies(
        params: GetTrendingMoviesQuery,
    ): Promise<Paginated<SearchMovieDto>> {
        try {
            const result = await tmdbAxios.get<Paginated<SearchMovieDto>>(
                `/3/trending/movie/${params.time_window}`,
                {
                    params: {
                        language: params.language,
                    },
                },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

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
            const result = await tmdbAxios.get<GetMovieByIdDto>(
                `/3/movie/${id}`,
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }
}
