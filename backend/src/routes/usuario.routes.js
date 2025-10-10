import { Router } from "express";
import { getUsuario, getUsuarios } from "../controllers/usuario.controller.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();
router.get('/', authenticate, authorize('operador', 'admin'), getUsuarios);
router.get('/:id', authenticate, authorize('operador', 'admin'), getUsuario);

export default router;