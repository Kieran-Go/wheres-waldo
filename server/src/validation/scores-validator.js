import { body, param } from 'express-validator';
import validateRequest from './validateRequest.js';

const validateScoreId = [
    param('id')
      .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validateRequest,
];

const validateCreateScore = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name cannot exceed 30 characters')
    .escape(),

  body('time')
    .isInt({ min: 0 }).withMessage('Time must be a positive number'),

  body('sceneId')
    .isInt({ gt: 0 }).withMessage('sceneId must be a positive integer'),

  validateRequest,
];

const validateEditScore = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
    .toInt(),

  body('name')
    .trim()
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({ max: 30 }).withMessage('Name cannot exceed 30 characters')
    .escape(),

  body('time')
    .isInt({ min: 0 }).withMessage('Time must be a positive number'),

  validateRequest,
];


export default {
    validateScoreId,
    validateCreateScore,
    validateEditScore,
}