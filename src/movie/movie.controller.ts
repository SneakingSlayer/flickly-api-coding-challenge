import { catchAsync } from '../common/utils/catchAsync';
import { SearchMovieParams } from './movie.dto';
import { MovieService } from './movie.service';
import { Router, Request, Response } from 'express';
import { movieQueryValidator } from './movie.validators';
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
            '/search',
            movieQueryValidator,
            handleValidationErrors,
            this.searchMovies,
        );
    }

    /**
     * Initialize route for the movie search endpoint.
     *
     */
    private searchMovies = catchAsync(
        async (req: Request<{}, {}, {}, SearchMovieParams>, res: Response) => {
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
}
