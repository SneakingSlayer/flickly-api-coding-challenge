import express, { Application } from 'express';
import { AppController } from './app.controller';
import { registerApiRoute } from './common/utils/registerApiRoute';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';

export class AppModule {
    public app: Application;

    /**
     * Initializes instance the module.
     * Controller registration & Middleware must be in particular order.
     */
    constructor() {
        this.app = express();
        this.registerControllers(); // 1
        this.configureMiddleware(); // 2
    }

    /**
     * Configures middlewares.
     */
    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(globalErrorHandler);
    }

    /**
     * Registers controllers.
     */
    private registerControllers() {
        // Register the app-level routes
        registerApiRoute(this.app, '/', AppController.create().router);

        // Register modules
    }
}

export default new AppModule().app;
