import { useState, useRef } from "react";
import UsuarioSelect from "./UsuarioSelect";
import LivroSelect from "./LivroSelect";

const EmprestimoForm = ({ onSubmit, isLoading }) => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [livros, setLivros] = useState([]);
  const [dataDevolucao, setDataDevolucao] = useState('');
  const usuarioSelectRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({usuarioId, livros, dataDevolucao})
    if (!usuarioId || livros.length === 0 || !dataDevolucao) {
      alert("Selecione um usuário, adicione livros e defina uma data de devolução.");
      return;
    }

    const emprestimoData = {
      usuario_id: usuarioId,
      data_devolucao_prevista: dataDevolucao,
      livros: livros.map((item) => ({ livro_id: item.livro_id }))
    };

    await onSubmit(emprestimoData);
    setUsuarioId(null);
    usuarioSelectRef.current?.reset();
    setLivros([]);
    setDataDevolucao('');
  };

  const handleLivroAdd = (livro) => {
    setLivros((prevLivros) => {
        if (prevLivros.find(l => l.livro_id === livro.livro_id)) {
            alert('Este livro já foi adicionado.');
            return prevLivros;
        }
        return [...prevLivros, livro];
    });
  };

  const removerLivro = (livroId) => {
    setLivros(livros.filter(l => l.livro_id !== livroId));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Novo Empréstimo</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <UsuarioSelect ref={usuarioSelectRef} onUsuarioSelect={(usuario) => setUsuarioId(usuario.id)} />
          <div className="mb-3">
            <label htmlFor="dataDevolucao" className="form-label">Data de Devolução Prevista *</label>
            <input 
              type="date" 
              id="dataDevolucao" 
              className="form-control" 
              value={dataDevolucao} 
              onChange={(e) => setDataDevolucao(e.target.value)} 
            />
          </div>
          <LivroSelect onLivroAdd={handleLivroAdd} />

          {livros.length > 0 && (
            <div className="mb-3">
              <h6>Livros Selecionados:</h6>
              {livros.map((item) => (
                <div key={item.livro_id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <span>{item.livro.titulo}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => removerLivro(item.livro_id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Empréstimo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmprestimoForm;