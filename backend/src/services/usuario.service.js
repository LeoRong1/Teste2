import * as usuarioRepo from '../repositories/usuario.repo.js';

export class UsuarioService {
    static async findAllUsuarios({ page = 1, limit = 10, nome } = {}) {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, parseInt(limit) || 10);
        return await usuarioRepo.findAllUsuarios({ page: pageNum, limit: limitNum, nome });
    }

    static async findUsuarioWithEmprestimos(id) {
        const usuarioId = parseInt(id);
        if (!usuarioId || usuarioId <= 0) {
            throw new Error('ID do usuário deve ser um número válido');
        }
        return await usuarioRepo.findUsuarioWithEmprestimos(usuarioId);
    }
}