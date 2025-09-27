import * as livroRepo from '../repositories/livro.repo.js';

export class LivroService {
    static async findAllLivros({ page = 1, limit = 10 } = {}) {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, parseInt(limit) || 10);
        return await livroRepo.findAllLivros({ page: pageNum, limit: limitNum });
    }

    static async createLivro({ titulo, autor, isbn, quantidade_disponivel }) {
        if (!titulo || titulo.trim().length === 0) {
            const error = new Error('Título do livro é obrigatório.');
            error.status = 400;
            throw error;
        }
        if (!autor || autor.trim().length === 0) {
            const error = new Error('Autor do livro é obrigatório.');
            error.status = 400;
            throw error;
        }
        if (quantidade_disponivel === undefined || quantidade_disponivel === null || quantidade_disponivel < 0) {
            const error = new Error('Quantidade deve ser maior ou igual a zero.');
            error.status = 400;
            throw error;
        }

        return await livroRepo.createLivro({
            titulo: titulo.trim(),
            autor: autor.trim(),
            isbn,
            quantidade_disponivel: parseInt(quantidade_disponivel)
        });
    }

    static async validarLivrosParaEmprestimo(livros) {
        const livroIds = livros.map(l => l.livro_id);
        const livrosDb = await livroRepo.findLivrosByIds(livroIds);

        if (livrosDb.length !== livros.length) {
            const error = new Error('Um ou mais livros não foram encontrados');
            error.status = 404;
            throw error;
        }

        const livrosValidados = [];
        for (const itemEmprestimo of livros) {
            const livroDb = livrosDb.find(l => l.id === itemEmprestimo.livro_id);
            if (livroDb.quantidade_disponivel < 1) {
                const error = new Error(`Livro sem estoque: ${livroDb.titulo}`);
                error.status = 400;
                throw error;
            }
            livrosValidados.push({ id: livroDb.id, titulo: livroDb.titulo });
        }
        return livrosValidados;
    }
}