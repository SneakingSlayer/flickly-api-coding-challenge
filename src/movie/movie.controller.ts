import { catchAsync } from '../common/utils/catchAsync';
import {
    GetMovieQuery,
    SearchMovieQuery,
    GetTrendingMoviesQuery,
    GetMovieGenresQuery,
    MovieListsQuery,
} from './movie.dto';
import { MovieService } from './movie.service';
import { Router, Request, Response } from 'express';
import {
    getMovieByIdValidator,
    movieGenreValidator,
    movieListValidtor,
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
