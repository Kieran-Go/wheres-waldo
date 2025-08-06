import { Router } from "express";
import controller from "../controllers/scenes-controller.js";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    const scenes = await controller.getAllScenes();
    res.send(scenes);
})

export default router;