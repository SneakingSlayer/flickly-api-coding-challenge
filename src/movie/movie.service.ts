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
    MovieRecommendationsQuery,
    MovieCreditsQuery,
    MovieCreditsDto,
    MovieImagesQuery,
    MovieImageDto,
} from './movie.dto';

export class MovieService {
    /**
     * Fetches the images associated with a specific movie by its ID from the TMDb API.
     *
     * @param {number} id - The unique identifier of the movie for which to fetch images.
     * @param {MovieImagesQuery} [params] - Optional query parameters to filter or modify the image data (e.g., language, image size).
     * @returns {Promise<MovieImagesDto>} A promise that resolves to a MovieImagesDto object containing the movie's image data.
     * @throws {Error} If the request fails or an error occurs during the data retrieval, the function throws an error.
     */
    async getMovieImages(
        id: number,
        params?: MovieImagesQuery,
    ): Promise<MovieImageDto> {
        try {
            const result = await tmdbAxios.get<MovieImageDto>(
                `/3/movie/${id}/images`,
                {
                    params,
                },
            );

            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Fetches the movie credits for a specific movie by its ID from the TMDb API.
     *
     * @param {number} id - The unique identifier of the movie for which to fetch the credits.
     * @param {MovieCreditsQuery} [params] - Optional query parameters to filter or modify the credits data (e.g., language, etc.).
     * @returns {Promise<MovieCreditsDto>} A promise that resolves to a MovieCreditsDto object containing the movie credits data.
     * @throws {Error} If the request fails or an error occurs during the data retrieval, the function throws an error.
     */
    async getMovieCredits(
        id: number,
        params?: MovieCreditsQuery,
    ): Promise<MovieCreditsDto> {
        try {
            const result = await tmdbAxios.get<MovieCreditsDto>(
                `/3/movie/${id}/credits`,
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Searches for movies based on the provided query parameters.
     *
     * @param {SearchMovieDto} params - The search parameters to filter or customize the request.
     *   These can include fields like `query` (search term), `page`, `language`, etc.
     *
     * @returns {Promise<Paginated<SearchMovieDto>>} A promise that resolves to a paginated list
     *   of search results, which will be in the form of `Paginated<SearchMovieDto>`.
     */
    async getMovieRecommendations(
        id: number,
        params?: MovieRecommendationsQuery,
    ) {
        try {
            const result = await tmdbAxios.get<Paginated<SearchMovieDto>>(
                `/3/movie/${id}/recommendations`,
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

    /**
     * Fetches a list of top-rated movies from the TMDB API.
     *
     * @param {MovieListsQuery} params - The query parameters to customize the request.
     *
     * @returns {Promise<Paginated<SearchMovieDto>>} A promise that resolves to a paginated list
     *   of top-rated movies.
     *
     * @throws {Error} Will throw an error if the request fails, which is handled by the `handleAxiosError` function.
     */
    async getTopRatedMovies(
        params: MovieListsQuery,
    ): Promise<Paginated<SearchMovieDto>> {
        try {
            const result = await tmdbAxios.get<Paginated<SearchMovieDto>>(
                `/3/movie/top_rated`,
                { params },
            );
            return result.data;
        } catch (error: any) {
            handleAxiosError(error);
            throw error;
        }
    }

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
