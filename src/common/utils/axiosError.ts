import { AxiosError } from 'axios';
import { AppError } from './appError';

/**
 * Handles errors from Axios requests and throws a custom `AppError` with appropriate messages.
 *
 * @param {AxiosError<any>} error - The Axios error object that was thrown during the HTTP request.
 */
export const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
        // Error response from the server
        throw new AppError(
            error.response.data?.status_message ??
                'Something went wrong with the API.',
            error.response?.status ?? 500,
        );
    } else if (error.request) {
        // No response received
        throw new AppError('No response received from the API.', 503);
    } else {
        // General errors
        throw new AppError(error?.message ?? 'An unknown error occurred', 500);
    }
};
