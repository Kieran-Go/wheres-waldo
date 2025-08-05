import { Router } from "express";

// Initialize router
const router = Router();

// GET routes
router.get('/', async (req, res) => {
    res.send('Hello, World!');
})

export default router;