import { Router } from "express";
import controller from "../controllers/characters-controller.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    try{
        const characters = await controller.getAllCharacters();
        res.json(characters);
    }
    catch(err) {
        throw err;
    }
}); 

router.get('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const character = await controller.getCharacter(id);
        res.json(character);
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
        const editedCharacter = await controller.editCharacter(name, imageUrl);
        res.json(editedCharacter);
    }
    catch(err) {
        throw err;
    }
});

// DELETE ROUTES
router.delete('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const deletedCharacter = await controller.deleteCharacter(id);
        res.json(deletedCharacter);
    }
    catch(err) {
        throw err;
    }
});

export default router;