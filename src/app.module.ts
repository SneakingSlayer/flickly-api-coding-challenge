import express, { Application } from 'express';
import { AppController } from './app.controller';
import { registerApiRoute } from './common/utils/registerApiRoute';

export class AppModule {
    public app: Application;

    /**
     * Initializes instance the module.
     */
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.registerControllers();
    }

    /**
     * Configures middlewares.
     */
    private configureMiddleware() {
        this.app.use(express.json());
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
