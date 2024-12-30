import { query, param } from 'express-validator';

export const getMovieByIdValidator = [
    param('id').isNumeric().withMessage('id must be of type number.'),
    query('append_to_response')
        .optional()
        .isString()
        .withMessage('append_to_response must be of type string.'),
    query('language')
        .optional()
        .isString()
        .withMessage('append_to_response must be of type string.'),
];

export const searchMovieQueryValidator = [
    query('query')
        .optional()
        .isString()
        .withMessage('query must be of type string.'),
    query('include_adult')
        .optional()
        .isBoolean()
        .withMessage('include_adult must be of type string.'),
    query('language')
        .optional()
        .isString()
        .withMessage('language must be of type string.'),
    query('primary_release_year')
        .optional()
        .isString()
        .withMessage('primary_release_year must be of type string.'),
    query('page')
        .optional()
        .isNumeric()
        .withMessage('page must be of type string.'),
    query('region')
        .optional()
        .isString()
        .withMessage('region must be of type string.'),
    query('year')
        .optional()
        .isString()
        .withMessage('year must be of type string.'),
];
