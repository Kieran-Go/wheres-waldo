import { Router } from "express";
import controller from "../controllers/scenes-controller.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    try{
        const scenes = await controller.getAllScenes();
        res.json(scenes);
    }
    catch(err){
        throw err;
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const scene = await controller.getScene(id);
        res.json(scene);
    }
    catch(err){
        throw err;
    }
});

//POST routes
router.post('/', async (req, res) => {
    try{
        const { name, imageUrl, } = req.body;
        const newScene = await controller.createScene(name, imageUrl);
        res.json(newScene);
    }
    catch(err){
        throw err;
    }
});

// PUT routes
router.put('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const { name, imageUrl } = req.body;
        const editedScene = await controller.editScene(id, name, imageUrl);
        res.json(editedScene);
    }
    catch(err) {
        throw err;
    }
});

// DELETE routes
router.delete('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const deletedScene = await controller.deleteScene(id);
        res.json(deletedScene);
    }
    catch(err) {
        throw err;
    }
});

router.post('/scene-character/:id', async (req, res) => {
    try{
        const sceneId = parseInt(req.params.id, 10);
        const { characterId, xMin, xMax, yMin, yMax } = req.body;
        const newSceneCharacter = await controller.createSceneCharacter(sceneId, characterId, xMin, xMax, yMin, yMax);
        res.json(newSceneCharacter);
    }
    catch(err){
        throw err;
    }
});

export default router;