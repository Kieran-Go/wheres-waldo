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

// POST routes
router.post('/:id', async (req, res) => {
    try{
        const sceneId = parseInt(req.params.id, 10);
        const { name, time } = req.body;
        const newScore = await controller.createScore(name, time, sceneId);
        res.json(newScore);
    }
    catch(err) {
        throw err;
    }
});

export default router;