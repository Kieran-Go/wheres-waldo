import { body, param } from 'express-validator';
import validateRequest from './validateRequest.js';

const validateCharacterId = [
    param('id')
      .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

    validateRequest,
];

const validateCreateCharacter = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name cannot exceed 30 characters')
    .escape(),

  body('imageUrl')
    .trim()
    .notEmpty().withMessage('Image URL is required').bail()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Image URL must be a valid http or https URL'),

  validateRequest,
];

const validateEditCharacter = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

  body('name')
    .trim()
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({ max: 30 }).withMessage('Name cannot exceed 30 characters')
    .escape(),

  body('imageUrl')
    .trim()
    .notEmpty().withMessage('Image URL cannot be empty').bail()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Image URL must be a valid http or https URL'),

  validateRequest,
];

export default {
    validateCharacterId,
    validateCreateCharacter,
    validateEditCharacter,
}