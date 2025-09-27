import { Router } from "express";
import { getAllEmprestimos, postEmprestimo } from "../controllers/emprestimo.controller.js";

const router = Router();
router.post('/', postEmprestimo);
router.get('/', getAllEmprestimos);

export default router;