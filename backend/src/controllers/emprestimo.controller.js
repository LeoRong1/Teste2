import { EmprestimoService } from "../services/emprestimo.service.js";

export async function postEmprestimo(req, res) {
   try {
     const { usuario_id, data_devolucao_prevista, livros } = req.body;
     console.log(req.body)
     const created = await EmprestimoService.createEmprestimo({ usuario_id, data_devolucao_prevista, livros });
     res.status(201).json(created);
   } catch (error) {
     res.status(error.status || 500).json({ 
       message: error.message 
     });
   }
}

export async function getAllEmprestimos(req, res) {
   try {
     const result = await EmprestimoService.getAllEmprestimos();
     res.json(result);
   } catch (error) {
     res.status(error.status || 500).json({ 
       message: error.message 
     });
   }
}