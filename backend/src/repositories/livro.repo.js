import pool from "../config/db.js";

export async function findAllLivros({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
        `SELECT id, titulo, autor, isbn, quantidade_disponivel, createdAt as criado_em 
         FROM livros 
         ORDER BY id 
         LIMIT ? OFFSET ?`,
        [Number(limit), Number(offset)]
    );
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM livros');
    return {
        data: rows,
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
    };
}

export async function findLivrosByIds(ids) {
    if (!ids || ids.length === 0) return [];
    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await pool.query(`SELECT id, titulo, autor, quantidade_disponivel 
                                      FROM livros WHERE id IN (${placeholders})`, ids);
    return rows;
}

export async function updateQuantidadeLivros(livros, conn = null) {
    const connection = conn || pool;
    for (const livro of livros) {
        await connection.query(`UPDATE livros SET quantidade_disponivel = quantidade_disponivel - 1 WHERE id = ?`, [livro.id]);
    }
}

export async function findLivroById(id) {
    const [rows] = await pool.query(`SELECT * FROM livros WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
}

export async function createLivro({ titulo, autor, isbn, quantidade_disponivel }) {
    const [result] = await pool.query(
        `INSERT INTO livros (titulo, autor, isbn, quantidade_disponivel, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [titulo, autor, isbn, quantidade_disponivel]
    );
    const livroId = result.insertId;
    return await findLivroById(livroId);
}