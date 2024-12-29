import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware for handling unhandled errors in the application.
 *
 * @param {any} err - The error object, which may contain a statusCode and message.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain (not used here).
 *
 * @returns {void} - Sends a JSON response with the error details to the client.
 */
export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error('Error: ', err);

    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message: message,
    });
};
