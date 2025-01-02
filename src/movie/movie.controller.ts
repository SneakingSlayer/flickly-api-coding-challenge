import { catchAsync } from '../common/utils/catchAsync';
import {
    GetMovieQuery,
    SearchMovieQuery,
    GetTrendingMoviesQuery,
    GetMovieGenresQuery,
    MovieListsQuery,
    MovieRecommendationsQuery,
    MovieCreditsQuery,
    MovieImagesQuery,
    GetMovieVideosQuery,
} from './movie.dto';
import { MovieService } from './movie.service';
import { Router, Request, Response } from 'express';
import {
    getMovieByIdValidator,
    movieCreditsValidator,
    movieGenreValidator,
    movieImagesValidator,
    movieListValidtor,
    movieRecommendationsValidator,
    movieVideosValidator,
    searchMovieQueryValidator,
    trendingMovieQueryValidator,
} from './movie.validators';
import { handleValidationErrors } from '../common/middlewares/validationErrors';

export class MovieController {
    public router: Router;

    /**
     * Initialize instance
     */
    constructor(private readonly movieService: MovieService) {
        this.router = Router();
        this.initializeRoutes();
    }

    /**
     * Initialize routes
     */
    private initializeRoutes() {
        this.router.get(
            '/:id/videos',
            movieVideosValidator,
            handleValidationErrors,
            this.getMovieVideos,
        );

        this.router.get(
            '/:id/images',
            movieImagesValidator,
            handleValidationErrors,
            this.getMovieImages,
        );

        this.router.get(
            '/:id/credits',
            movieCreditsValidator,
            handleValidationErrors,
            this.getMovieCredits,
        );

        this.router.get(
            '/:id/recommendations',
            movieRecommendationsValidator,
            handleValidationErrors,
            this.getMovieRecommendations,
        );

        this.router.get(
            '/top-rated',
            movieListValidtor,
            handleValidationErrors,
            this.getTopRatedMovies,
        );

        this.router.get(
            '/popular',
            movieListValidtor,
            handleValidationErrors,
            this.getPopularMovies,
        );

        this.router.get(
            '/genres',
            movieGenreValidator,
            handleValidationErrors,
            this.getMovieGenres,
        );

        this.router.get(
            '/trending',
            trendingMovieQueryValidator,
            handleValidationErrors,
            this.getTrendingMovies,
        );

        this.router.get(
            '/search',
            searchMovieQueryValidator,
            handleValidationErrors,
            this.searchMovies,
        );

        this.router.get(
            '/:id',
            getMovieByIdValidator,
            handleValidationErrors,
            this.getMovieById,
        );
    }

    /**
     * Initialize route for get movie videos endpoint.
     */
    private getMovieVideos = catchAsync(
        async (
            req: Request<{ id?: number }, {}, {}, GetMovieVideosQuery>,
            res: Response,
        ) => {
            const movieId = req.params?.id;
            const { language } = req.query;
            const result = await this.movieService.getMovieVideos(
                Number(movieId),
                {
                    language,
                },
            );
            res.json(result);
        },
    );

    /**
     * Initialize route for get movie images endpoint.
     */
    private getMovieImages = catchAsync(
        async (
            req: Request<{ id?: number }, {}, {}, MovieImagesQuery>,
            res: Response,
        ) => {
            const movieId = req.params?.id;
            const { language, include_image_language } = req.query;
            const result = await this.movieService.getMovieImages(
                Number(movieId),
                {
                    language,
                    include_image_language,
                },
            );
            res.json(result);
        },
    );

    /**
     * Initialize route for get movie credits endpoint.
     */
    private getMovieCredits = catchAsync(
        async (
            req: Request<{ id?: number }, {}, {}, MovieCreditsQuery>,
            res: Response,
        ) => {
            const movieId = req.params?.id;
            const { language = 'en-US' } = req.query;
            const result = await this.movieService.getMovieCredits(
                Number(movieId),
                {
                    language,
                },
            );
            res.json(result);
        },
    );

    /**
     * Initialize route for get movie recommendations endpoint.
     */
    private getMovieRecommendations = catchAsync(
        async (
            req: Request<{ id?: number }, {}, {}, MovieRecommendationsQuery>,
            res: Response,
        ) => {
            const movieId = req.params?.id;
            const { page = 1, language = 'en-US' } = req.query;
            const result = await this.movieService.getMovieRecommendations(
                Number(movieId),
                {
                    page,
                    language,
                },
            );
            res.json(result);
        },
    );

    /**
     * Initialize route for get top rated movies endpoint.
     */
    private getTopRatedMovies = catchAsync(
        async (req: Request<{}, {}, {}, MovieListsQuery>, res: Response) => {
            const { page = 1, region } = req.query;
            const result = await this.movieService.getTopRatedMovies({
                page,
                region,
            });
            res.json(result);
        },
    );

    /**
     * Initialize route for get popular movies endpoint.
     */
    private getPopularMovies = catchAsync(
        async (req: Request<{}, {}, {}, MovieListsQuery>, res: Response) => {
            const { page = 1, region } = req.query;
            const result = await this.movieService.getPopularMovies({
                page,
                region,
            });
            res.json(result);
        },
    );

    /**
     * Initialize route for get movie genres endpoint.
     */
    private getMovieGenres = catchAsync(
        async (
            req: Request<{}, {}, {}, GetMovieGenresQuery>,
            res: Response,
        ) => {
            const { language = 'en-US' } = req.query;
            const result = await this.movieService.getMovieGenres({ language });
            res.json(result);
        },
    );

    /**
     * Initialize route for get trending movies endpoint.
     */
    private getTrendingMovies = catchAsync(
        async (
            req: Request<{}, {}, {}, GetTrendingMoviesQuery>,
            res: Response,
        ) => {
            const { time_window = 'day', language = 'en-US' } = req.query;

            const result = await this.movieService.getTrendingMovies({
                time_window,
                language,
            });

            res.json(result);
        },
    );

    /**
     * Initialize route for the movie search endpoint.
     *
     */
    private searchMovies = catchAsync(
        async (req: Request<{}, {}, {}, SearchMovieQuery>, res: Response) => {
            const {
                query = '',
                include_adult = false,
                page = 1,
                language = 'en-US',
                primary_release_year = '',
                region = '',
                year = '',
            } = req.query;

            const result = await this.movieService.searchMovies({
                page,
                query,
                include_adult,
                language,
                primary_release_year,
                region,
                year,
            });
            res.json(result);
        },
    );

    /**
     * Initialize route for get a movie endpoint.
     */
    private getMovieById = catchAsync(
        async (
            req: Request<{ id?: number }, {}, {}, GetMovieQuery>,
            res: Response,
        ) => {
            const { append_to_response = '', language = 'en-US' } = req.query;

            const movieId = req.params?.id;

            const result = await this.movieService.getMovieById(
                Number(movieId),
                {
                    append_to_response,
                    language,
                },
            );

            res.json(result);
        },
    );
}
