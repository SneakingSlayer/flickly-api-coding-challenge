import { Request, Response, NextFunction } from 'express';

/**
 * A higher-order function that wraps an asynchronous route handler function to automatically catch errors.
 *
 * @param {Function} fn - The asynchronous route handler function. It should return a Promise.
 * @returns {Function} - A middleware function that wraps the provided async handler.
 */
export const catchAsync = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
