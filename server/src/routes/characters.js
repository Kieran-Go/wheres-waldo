import { Router } from "express";
import controller from "../controllers/characters-controller.js";
import verify from "../middleware/verify.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res, next) => {
    try{
        const characters = await controller.getAllCharacters();
        res.json(characters);
    }
    catch(err) {
        next(err);
    }
}); 

router.get('/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const character = await controller.getCharacterById(id);
        res.json(character);
    }
    catch(err) {
        next(err);
    }
});

// POST routes
router.post('/', verify, async (req, res, next) => {
    try{
        const { name, imageUrl } = req.body;
        const newCharacter = await controller.createCharacter(name, imageUrl);
        res.json(newCharacter);
    }
    catch(err) {
        next(err);
    }
});

// PUT routes
router.put('/:id', verify, async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const { name, imageUrl } = req.body;
        const editedCharacter = await controller.editCharacter(name, imageUrl);
        res.json(editedCharacter);
    }
    catch(err) {
        next(err);
    }
});

// DELETE ROUTES
router.delete('/:id', verify, async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        const deletedCharacter = await controller.deleteCharacter(id);
        res.json(deletedCharacter);
    }
    catch(err) {
        next(err);
    }
});

export default router;