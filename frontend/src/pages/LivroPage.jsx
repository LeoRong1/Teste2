import LivroList from "../components/LivroList";
import { useEffect, useState } from "react";
import apiService from "../services/api";
import LivroForm from "../components/LivroForm";

const LivrosPage = () => {
  const [livros, setLivros] = useState([]);
  const [isLoadingList, setLoadingList] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    setLoadingList(true);
    try {
      const response = await apiService.getLivros();
      setLivros(response.data || []);
    } catch (error) {
      console.log(error);
      setLivros([]);
    } finally {
      setLoadingList(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleCadastrarLivro = async (livroData) => {
    setIsLoadingForm(true);
    try {
      const novoLivro = await apiService.createLivro(livroData);
      setLivros((prev) => [...prev, novoLivro]);
      showAlert("Livro cadastrado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      showAlert("Erro ao cadastrar livro", "danger");
      throw error;
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold text-primary">Gestão de Livros</h1>
        <p className="lead text-muted">Sistema de cadastro e listagem de livros</p>
      </header>
      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
      <div className="mb-4">
        <LivroForm onSubmit={handleCadastrarLivro} isLoading={isLoadingForm} />
      </div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Livros Cadastrados</h5>
          <button className="btn btn-outline-primary btn-sm" onClick={carregarLivros} disabled={isLoadingList}>
            Atualizar
          </button>
        </div>
        <div className="card-body p-0">
          <LivroList livros={livros} isLoading={isLoadingList} />
        </div>
        {livros.length > 0 && (
          <div className="card-footer text-muted">
            <small>Total de {livros.length} livro{livros.length !== 1 ? 's' : ''} cadastrado{livros.length !== 1 ? 's' : ''}</small>
          </div>
        )}
      </div>
    </div>
  );
};
export default LivrosPage;