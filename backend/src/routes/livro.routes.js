import { Router } from "express";
import { getLivros, postLivro } from "../controllers/livro.controller.js";

const router = Router();
router.post('/', postLivro);
router.get('/', getLivros);

export default router;