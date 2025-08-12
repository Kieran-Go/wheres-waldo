import { body, param } from 'express-validator';
import validateRequest from './validateRequest.js';

const validateSceneId = [
    param('sceneId')
        .isInt({ gt: 0 }).withMessage('sceneId must be a positive integer'),

    validateRequest,
];

const validateSceneCharacter = [
    body('sceneId')
        .isInt({ gt: 0 }).withMessage('sceneId must be a positive integer'),

    body('characterId')
        .isInt({ gt: 0 }).withMessage('characterId must be a positive integer'),

    body('xMin')
        .isInt({ min: 0 }).withMessage('xMin must be a non-negative integer'),

    body('xMax')
        .isInt({ min: 0 }).withMessage('xMax must be a non-negative integer'),

    body('yMin')
        .isInt({ min: 0 }).withMessage('yMin must be a non-negative integer'),

    body('yMax')
        .isInt({ min: 0 }).withMessage('yMax must be a non-negative integer'),

    validateRequest,
];

const validateSceneCharacterId = [
    body('sceneId')
        .isInt({ gt: 0 }).withMessage('sceneId must be a positive integer'),

    body('characterId')
        .isInt({ gt: 0 }).withMessage('characterId must be a positive integer'),

    validateRequest,
];

export default {
    validateSceneId,
    validateSceneCharacter,
    validateSceneCharacterId,
}