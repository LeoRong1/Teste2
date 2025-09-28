import { UsuarioService } from "../services/usuario.service.js";

export async function getUsuarios(req, res) {
   const { page = 1, limit = 10, nome } = req.query;
   const result = await UsuarioService.findAllUsuarios({ page, limit, nome });
   res.json(result); 
} 

export async function getUsuario(req, res) {
   const { id } = req.params;
   const result = await UsuarioService.findUsuarioWithEmprestimos(id);
   res.json(result);
}