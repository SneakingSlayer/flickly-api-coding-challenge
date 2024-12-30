import { catchAsync } from '../common/utils/catchAsync';
import { GetMovieQuery, SearchMovieQuery } from './movie.dto';
import { MovieService } from './movie.service';
import { Router, Request, Response } from 'express';
import {
    getMovieByIdValidator,
    searchMovieQueryValidator,
} from './movie.validators';
import { handleValidationErrors } from '../common/middlewares/validationErrors';
import { AppError } from '../common/utils/appError';

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
