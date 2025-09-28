import { useState, useEffect } from "react";
import apiService from "../services/api";

const LivroSelect = ({ onLivroAdd }) => {
  const [livros, setLivros] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState("");

  useEffect(() => {
    buscarLivros();
  }, []);

  const buscarLivros = async () => {
    try {
      const response = await apiService.getLivros();
      setLivros(response.data.filter(livro => livro.quantidade_disponivel > 0));
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleAdd = () => {
    if (!selectedLivro) return;
    const livro = livros.find(l => l.id === parseInt(selectedLivro));
    if (livro) {
        onLivroAdd({
            livro_id: livro.id,
            livro: livro
        });
    }
    setSelectedLivro("");
  };

  return (
    <div className="mb-3">
      <label className="form-label">Livros *</label>
      <div className="input-group">
        <select
          className="form-select"
          value={selectedLivro}
          onChange={(e) => setSelectedLivro(e.target.value)}
        >
          <option value="">Selecione um livro</option>
          {livros.map(livro => (
            <option key={livro.id} value={livro.id}>
              {livro.titulo} (Autor: {livro.autor})
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>Adicionar</button>
      </div>
    </div>
  );
};
export default LivroSelect;