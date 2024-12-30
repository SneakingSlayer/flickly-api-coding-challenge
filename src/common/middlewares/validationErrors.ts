import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors in incoming requests.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function in the stack to be called if no errors are found.
 */
export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
