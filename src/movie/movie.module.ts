import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

export class MovieModule {
    /**
     * Create instance of controller.
     */
    public static create() {
        const movieService = new MovieService();
        const movieController = new MovieController(movieService);
        return movieController.router;
    }
}
