import { Router } from 'express';
import controller from "../controllers/scores-controller.js";

const router = Router();

// GET routes
router.get('/', async (req, res) => {
    try{
        const scores = await controller.getAllScores();
        res.json(scores);
    }
    catch(err){
        throw err;
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const score = await controller.getScore(id);
        res.json(score);
    }
    catch(err) {
        throw err;
    }
});

router.get('/scenes/:id', async (req, res) => {
    try{
        const sceneId = parseInt(req.params.id, 10);
        const sceneScores = await controller.getSceneScores(sceneId);
        res.json(sceneScores);
    }
    catch(err) {
        throw err;
    }
});

// POST routes
router.post('/', async (req, res) => {
    try{
        const { name, time, sceneId } = req.body;
        const newScore = await controller.createScore(name, time, sceneId);
        res.json(newScore);
    }
    catch(err) {
        throw err;
    }
});

// PUT routes
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, time } = req.body;
        const editedScore = await controller.editScore(id, name, time);
        res.json(editedScore);
    }
    catch(err) {
        throw err;
    }
});

// DELETE routes
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedScore = await controller.deleteScore(id);
        res.json(deletedScore);
    }
    catch(err) {
        throw err;
    }
});

router.delete('/scenes/:id', async (req, res) => {
    try {
        const sceneId = parseInt(req.params.id, 10);
        const deletedSceneScores = await controller.deleteSceneScores(sceneId);
        res.json(deletedSceneScores);
    }
    catch(err) {
        throw err;
    }
});

export default router;