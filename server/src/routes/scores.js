import { Router } from 'express';
import controller from "../controllers/scores-controller.js";
import verify from "../middleware/verify.js";

const router = Router();

// GET routes
router.get('/', async (req, res, next) => {
    try{
        const scores = await controller.getAllScores();
        res.json(scores);
    }
    catch(err){
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const score = await controller.getScoreById(id);
        res.json(score);
    }
    catch(err) {
        next(err);
    }
});

router.get('/scenes/:id', async (req, res, next) => {
    try{
        const sceneId = parseInt(req.params.id, 10);
        const sceneScores = await controller.getScoresBySceneId(sceneId);
        res.json(sceneScores);
    }
    catch(err) {
        next(err);
    }
});

// POST routes
router.post('/', verify, async (req, res, next) => {
    try{
        const { name, time, sceneId } = req.body;
        const newScore = await controller.createScore(name, time, sceneId);
        res.json(newScore);
    }
    catch(err) {
        next(err);
    }
});

// PUT routes
router.put('/:id', verify, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, time } = req.body;
        const editedScore = await controller.editScore(id, name, time);
        res.json(editedScore);
    }
    catch(err) {
        next(err);
    }
});

// DELETE routes
router.delete('/:id', verify, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedScore = await controller.deleteScore(id);
        res.json(deletedScore);
    }
    catch(err) {
        next(err);
    }
});

router.delete('/scenes/:id', verify, async (req, res, next) => {
    try {
        const sceneId = parseInt(req.params.id, 10);
        const deletedSceneScores = await controller.deleteSceneScores(sceneId);
        res.json(deletedSceneScores);
    }
    catch(err) {
        next(err);
    }
});

export default router;