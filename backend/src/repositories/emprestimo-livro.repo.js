import pool from "../config/db.js";

export async function insertEmprestimoLivro(emprestimoId, livros, conn) {
    for (const livro of livros) {
        await conn.query(`
            INSERT INTO emprestimo_livros (emprestimo_id, livro_id, createdAt, updatedAt)
            VALUES (?, ?, NOW(), NOW())`, [
                emprestimoId,
                livro.id
            ]);
    }
}

export async function findLivrosByEmprestimoId(emprestimoId) {
    const [rows] = await pool.query(`
        SELECT 
            el.id,
            l.id as livro_id,
            l.titulo as livro_titulo
        FROM emprestimo_livros el
        JOIN livros l ON el.livro_id = l.id
        WHERE el.emprestimo_id = ?
        ORDER BY el.id`, [emprestimoId]);
    return rows;
}