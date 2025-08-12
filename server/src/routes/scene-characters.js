import { Router } from "express";
import controller from "../controllers/scene-characters-controller.js";
import verify from "../middleware/verify.js";
import val from "../validation/scene-characters-validator.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res, next) => {
    try{
        const sceneCharacters = await controller.getSceneCharacters();
        res.json(sceneCharacters);
    }
    catch(err){
        next(err);
    }
});

router.get('/scenes/:sceneId', val.validateSceneId, async (req, res, next) => {
    try{
        const sceneId = parseInt(req.params.sceneId);
        const sceneCharacters = await controller.getSceneCharactersBySceneId(sceneId);
        res.json(sceneCharacters);
    }
    catch(err){
        next(err);
    }
});

// POST routes
router.post('/', verify, val.validateSceneCharacter, async (req, res, next) => {
    try{
        const { sceneId, characterId, xMin, xMax, yMin, yMax } = req.body;
        const newSceneCharacter = await controller.createSceneCharacter(sceneId, characterId, xMin, xMax, yMin, yMax);
        res.json(newSceneCharacter);
    }
    catch(err){
        next(err);
    }
});

// PUT routes
router.put('/', verify, val.validateSceneCharacter, async (req, res, next) => {
    try{
        const { sceneId, characterId, xMin, xMax, yMin, yMax } = req.body;
        const editedSceneCharacter = await controller.editSceneCharacter(sceneId, characterId, xMin, xMax, yMin, yMax);
        res.json(editedSceneCharacter);
    }
    catch(err){
        next(err);
    }
});

// DELETE routes
router.delete('/', verify, val.validateSceneCharacterId, async (req, res, next) => {
    try{
        const { sceneId, characterId } = req.body;
        const deletedSceneCharacter = await controller.deleteSceneCharacter(sceneId, characterId);
        res.json(deletedSceneCharacter);
    }
    catch(err){
        next(err);
    }
});

export default router;