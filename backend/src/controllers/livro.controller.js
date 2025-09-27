import { LivroService } from "../services/livro.service.js";

export async function getLivros(req, res) {
   try {
      const { page = 1, limit = 10 } = req.query;
      const result = await LivroService.findAllLivros({ page, limit });
      res.json(result);
   } catch (error) {
      res.status(error.status || 500).json({ 
         message: error.message 
      });
   }
}

export async function postLivro(req, res) {
   try {
      const { titulo, autor, isbn, quantidade_disponivel } = req.body;
      const result = await LivroService.createLivro({ titulo, autor, isbn, quantidade_disponivel });
      res.status(201).json(result);
   } catch (error) {
      res.status(error.status || 500).json({ 
         message: error.message 
      });
   }
}