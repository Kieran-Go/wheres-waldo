import { Router } from "express";
import controller from "../controllers/scene-characters-controller.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    try{
        const sceneCharacters = await controller.getSceneCharacters();
        res.json(sceneCharacters);
    }
    catch(err){
        throw err;
    }
});

router.get('/scenes/:sceneId', async (req, res) => {
    try{
        const sceneId = parseInt(req.params.sceneId);
        const sceneCharacters = await controller.getSceneCharactersByScene(sceneId);
        res.json(sceneCharacters);
    }
    catch(err){
        throw err;
    }
});

// POST routes
router.post('/', async (req, res) => {
    try{
        const { sceneId, characterId, xMin, xMax, yMin, yMax } = req.body;
        const newSceneCharacter = await controller.createSceneCharacter(sceneId, characterId, xMin, xMax, yMin, yMax);
        res.json(newSceneCharacter);
    }
    catch(err){
        throw err;
    }
});

// PUT routes
router.put('/', async (req, res) => {
    try{
        const { sceneId, characterId, xMin, xMax, yMin, yMax } = req.body;
        const editedSceneCharacter = await controller.editSceneCharacter(sceneId, characterId, xMin, xMax, yMin, yMax);
        res.json(editedSceneCharacter);
    }
    catch(err){
        throw err;
    }
});

// DELETE routes
router.delete('/', async (req, res) => {
    try{
        const { sceneId, characterId } = req.body;
        const deletedSceneCharacter = await controller.deleteSceneCharacter(sceneId, characterId);
        res.json(deletedSceneCharacter);
    }
    catch(err){
        throw err;
    }
});

export default router;