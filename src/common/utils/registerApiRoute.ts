import { Application, Router } from 'express';

/**
 * Registers an API route with a given base path and router in the application.
 *
 * @param {Application} app - The Express application instance.
 * @param {string} path - The base path for the route (e.g., '/movies').
 * @param {Router} router - The router instance containing the route handlers.
 */
export function registerApiRoute(
    app: Application,
    path: string,
    router: Router,
) {
    const fullPath = `/api${path}`;
    app.use(fullPath, router);
}
