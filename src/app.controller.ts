import { Router, Response, Request } from 'express';
import { AppService } from './app.service';

export class AppController {
    public router: Router;

    /**
     * Initialize instance
     */
    constructor(private readonly appService: AppService) {
        this.router = Router();
        this.initializeRoutes();
    }

    /**
     * Initialize routes
     */
    private initializeRoutes() {
        this.router.get('/', this.getHello.bind(this));
    }

    /**
     * Create instance of controller
     */
    static create(): AppController {
        const appService = new AppService();
        return new AppController(appService);
    }

    /**
     * Welcome route
     */
    private getHello(_: Request, res: Response) {
        res.json(this.appService.getHello());
    }
}
