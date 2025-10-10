import pool from "../config/db.js";
import * as emprestimoLivroRepo from "./emprestimo-livro.repo.js";
import * as livroRepo from "./livro.repo.js";

export async function createEmprestimo({ usuario_id, data_devolucao_prevista, livros = [] }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO emprestimos (usuario_id, data_emprestimo, data_devolucao_prevista, createdAt, updatedAt) VALUES (?, CURDATE(), ?, NOW(), NOW())`,
      [usuario_id, data_devolucao_prevista]
    );


    const emprestimoId = result.insertId;

    if (livros && livros.length > 0) {
      await emprestimoLivroRepo.insertEmprestimoLivro(emprestimoId, livros, conn);
      await livroRepo.updateQuantidadeLivros(livros, conn);
      console.log('teste')
    }

    await conn.commit();
    const [emprestimoRows] = await conn.query(
      `SELECT * FROM emprestimos WHERE id = ?`,
      [emprestimoId]
    );
    const emprestimo = emprestimoRows[0];
    if (livros && livros.length > 0) {
      emprestimo.livros = await emprestimoLivroRepo.findLivrosByEmprestimoId(emprestimoId);
    }

    return emprestimo;
  } catch (error) {
    console.error(error)
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function getAllEmprestimos() {
  const [rows] = await pool.query(`
    SELECT 
      e.id,
      e.usuario_id,
      u.nome as usuario_nome,
      e.data_emprestimo,
      e.data_devolucao_prevista,
      e.data_devolucao_real,
      e.status,
      el.id as item_id,
      l.id as livro_id,
      l.titulo as livro_titulo
    FROM emprestimos e
    LEFT JOIN emprestimo_livros el ON e.id = el.emprestimo_id
    LEFT JOIN livros l ON l.id = el.livro_id
    INNER JOIN usuarios u ON u.id = e.usuario_id
    ORDER BY e.id DESC
  `);

  const emprestimoMap = new Map();

  rows.forEach((row) => {
    if (!emprestimoMap.has(row.id)) {
      emprestimoMap.set(row.id, {
        id: row.id,
        usuario_id: row.usuario_id,
        usuario_nome: row.usuario_nome,
        data_emprestimo: row.data_emprestimo,
        data_devolucao_prevista: row.data_devolucao_prevista,
        data_devolucao_real: row.data_devolucao_real,
        status: row.status,
        livros: [],
      });
    }
    if (row.livro_id) {
      emprestimoMap.get(row.id).livros.push({
        id: row.item_id,
        livro_id: row.livro_id,
        livro_titulo: row.livro_titulo,
      });
    }
  });

  return Array.from(emprestimoMap.values());
}