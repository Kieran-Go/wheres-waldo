import { Router } from "express";
import controller from "../controllers/scenes-controller.js";
import verify from "../middleware/verify.js";
import val from "../validation/scenes-validator.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res, next) => {
    try{
        const scenes = await controller.getAllScenes();
        res.json(scenes);
    }
    catch(err){
        next(err);
    }
});

router.get('/:id', val.validateSceneId, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const scene = await controller.getSceneById(id);
        res.json(scene);
    }
    catch(err){
        next(err);
    }
});

//POST routes
router.post('/', verify, val.validateCreateScene, async (req, res, next) => {
    try{
        const { name, imageUrl, } = req.body;
        const newScene = await controller.createScene(name, imageUrl);
        res.json(newScene);
    }
    catch(err){
        next(err);
    }
});

// PUT routes
router.put('/:id', verify, val.validateEditScene, async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const { name, imageUrl } = req.body;
        const editedScene = await controller.editScene(id, name, imageUrl);
        res.json(editedScene);
    }
    catch(err) {
        next(err);
    }
});

// DELETE routes
router.delete('/:id', verify, val.validateSceneId, async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const deletedScene = await controller.deleteScene(id);
        res.json(deletedScene);
    }
    catch(err) {
        next(err);
    }
});

export default router;