import express, { Application } from 'express';
import { AppController } from './app.controller';
import { registerApiRoute } from './common/utils/registerApiRoute';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import { MovieModule } from './movie/movie.module';
import cors from 'cors';

export class AppModule {
    public app: Application;

    /**
     * Initializes instance the module.
     */
    constructor() {
        this.app = express();
        this.configurePreControllerMiddleware();
        this.registerControllers();
        this.configurePostControllerMiddleware();
    }

    /**
     * Configures middlewares needed before registration of controllers.
     */
    private configurePreControllerMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    /**
     * Configures middlewares needed after registration of controllers.
     */
    private configurePostControllerMiddleware() {
        this.app.use(globalErrorHandler);
    }

    /**
     * Registers controllers.
     */
    private registerControllers() {
        // Register the app-level routes
        registerApiRoute(this.app, '/', AppController.create().router);

        // Register modules
        registerApiRoute(this.app, '/movies', MovieModule.create());
    }
}

export default new AppModule().app;
