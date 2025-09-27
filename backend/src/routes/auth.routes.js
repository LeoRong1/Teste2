import { Router } from "express";
import { getMe, Login } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post('/', Login);
router.get('/me', authenticate, getMe);

export default router;