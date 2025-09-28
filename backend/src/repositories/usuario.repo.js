import pool from "../config/db.js";

export async function findAllUsuarios({ page = 1, limit = 10, nome }) {
    const offset = (page - 1) * limit;

    let query = 'SELECT id, nome, email, telefone, createdAt as criado_em FROM usuarios';
    let countQuery = 'SELECT COUNT(*) as total FROM usuarios';
    const params = [];
    const countParams = [];

    if (nome) {
        query += ' WHERE nome LIKE ?';
        countQuery += ' WHERE nome LIKE ?';
        params.push(`%${nome}%`);
        countParams.push(`%${nome}%`);
    }

    query += ' ORDER BY id LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));


    const [rows] = await pool.query(query, params);
    const [[{ total }]] = await pool.query(countQuery, countParams);
    return { data: rows, page: Number(page), limit: Number(limit), total };
}

export async function findUsuarioById(id) {
    const [rows] = await pool.query('SELECT id, nome, email, telefone, createdAt as criado_em FROM usuarios WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
}

export async function findUsuarioWithEmprestimos(id) {
    const [rows] = await pool.query(`
        SELECT 
            e.id,
            e.usuario_id,
            e.data_emprestimo,
            e.data_devolucao_prevista,
            e.status,
            el.id as item_id,
            l.id as livro_id,
            l.titulo as livro_titulo
        FROM emprestimos e
        LEFT JOIN emprestimo_livros el ON e.id = el.emprestimo_id
        LEFT JOIN livros l ON l.id = el.livro_id
        WHERE e.usuario_id = ?`, [id]);

    const emprestimoMap = new Map();

    rows.forEach(row => {
        if (!emprestimoMap.has(row.id)) {
            emprestimoMap.set(row.id, {
                id: row.id,
                usuario_id: row.usuario_id,
                data_emprestimo: row.data_emprestimo,
                data_devolucao_prevista: row.data_devolucao_prevista,
                status: row.status,
                livros: []
            });
        }
        if (row.livro_id) {
            emprestimoMap.get(row.id).livros.push({
                id: row.item_id,
                livro_id: row.livro_id,
                livro_titulo: row.livro_titulo
            });
        }
    });

    return Array.from(emprestimoMap.values());
}