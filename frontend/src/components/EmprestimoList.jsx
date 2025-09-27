const EmprestimoList = ({ emprestimos, isLoading }) => {
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!emprestimos || emprestimos.length === 0) {
    return <div>Nenhum empréstimo encontrado.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Data Empréstimo</th>
            <th>Devolução Prevista</th>
            <th>Status</th>
            <th>Livros</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map(emprestimo => (
            <tr key={emprestimo.id}>
              <td>#{emprestimo.id}</td>
              <td>{emprestimo.usuario_nome}</td>
              <td>{new Date(emprestimo.data_emprestimo).toLocaleDateString()}</td>
              <td>{new Date(emprestimo.data_devolucao_prevista).toLocaleDateString()}</td>
              <td><span className="badge bg-info">{emprestimo.status}</span></td>
              <td>{emprestimo.livros.map(l => l.livro_titulo).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmprestimoList;