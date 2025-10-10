import * as emprestimoRepo from '../repositories/emprestimo.repo.js';
import * as usuarioRepo from '../repositories/usuario.repo.js';
import { LivroService } from './livro.service.js';

export class EmprestimoService {
    static async createEmprestimo({ usuario_id, data_devolucao_prevista, livros = [] }) {
        const usuarioId = parseInt(usuario_id);

        if (!usuarioId || usuarioId <= 0) {
            const error = new Error('ID do usuário deve ser um número válido');
            error.status = 400;
            throw error;
        }

        const usuario = await usuarioRepo.findUsuarioById(usuarioId);
        console.log(usuario,usuarioId)
        if (!usuario) {
            const error = new Error('Usuário não encontrado');
            error.status = 404;
            throw error;
        }

        if (!data_devolucao_prevista) {
            const error = new Error('A data de devolução prevista é obrigatória.');
            error.status = 400;
            throw error;
        }

        let livrosValidados = [];
        if (livros && livros.length > 0) {
            livrosValidados = await LivroService.validarLivrosParaEmprestimo(livros);
        } else {
            const error = new Error('É necessário adicionar pelo menos um livro ao empréstimo.');
            error.status = 400;
            throw error;
        }

        return await emprestimoRepo.createEmprestimo({
            usuario_id: usuarioId,
            data_devolucao_prevista,
            livros: livrosValidados
        });
    }

    static async getAllEmprestimos() {
        return await emprestimoRepo.getAllEmprestimos();
    }
}