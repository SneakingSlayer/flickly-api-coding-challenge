import { MovieService } from './movie.service';
import { Router } from 'express';

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
    private initializeRoutes() {}
}
