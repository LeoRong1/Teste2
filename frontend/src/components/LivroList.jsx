const LivroList = ({ livros, isLoading }) => {
  if (isLoading) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }
  if (!livros || livros.length === 0) {
    return <div className="alert alert-info">Nenhum livro cadastrado.</div>;
  }
  const formatarData = (data) => new Date(data).toLocaleString('pt-BR');

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Disponível</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <th>{livro.id}</th>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.isbn || '-'}</td>
              <td><span className={`badge ${livro.quantidade_disponivel > 0 ? 'bg-success' : 'bg-danger'}`}>{livro.quantidade_disponivel}</span></td>
              <td>{formatarData(livro.criado_em)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LivroList;