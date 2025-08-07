import { Router } from "express";
import controller from "../controllers/characters-controller.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    try{
        const characters = await controller.getCharacters();
        res.json(characters);
    }
    catch(err) {
        throw err;
    }
}); 

// POST routes
router.post('/', async (req, res) => {
    try{
        const { name, imageUrl } = req.body;
        const newCharacter = await controller.createCharacter(name, imageUrl);
        res.json(newCharacter);
    }
    catch(err) {
        throw err;
    }
});

// PUT routes
router.put('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const { name, imageUrl } = req.body;
        const editedCharacter = await controller.editCharacter(id, name, imageUrl);
        res.json(editedCharacter);
    }
    catch(err) {
        throw err;
    }
});

export default router;