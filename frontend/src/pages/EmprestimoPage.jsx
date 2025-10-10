import { useState, useEffect } from "react";
import EmprestimoForm from "../components/EmprestimoForm";
import EmprestimoList from "../components/EmprestimoList";
import apiService from "../services/api";

const EmprestimosPage = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("criar");

  useEffect(() => {
    if (activeTab === "listar") {
      carregarEmprestimos();
    }
  }, [activeTab]);

  const carregarEmprestimos = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getEmprestimos();
      setEmprestimos(response);
    } catch (error) {
      console.error("Erro ao carregar empréstimos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const criarEmprestimo = async (emprestimoData) => {
    try {
      await apiService.createEmprestimo(emprestimoData);
      alert("Empréstimo criado com sucesso!");
      setActiveTab("listar"); // Muda para a aba de listagem após o sucesso
    } catch (error) {
      console.log(error);
      alert("Erro ao criar empréstimo");
    }
  };

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">Gestão de Empréstimos</h1>
        <p className="lead text-muted">Crie novos empréstimos e visualize o histórico.</p>
      </header>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "criar" ? "active" : ""}`} onClick={() => setActiveTab("criar")}>
            Novo Empréstimo
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "listar" ? "active" : ""}`} onClick={() => setActiveTab("listar")}>
            Listar Empréstimos
          </button>
        </li>
      </ul>

      {activeTab === "criar" && <EmprestimoForm onSubmit={criarEmprestimo} isLoading={isLoading} />}
      {activeTab === "listar" && (
        <div className="card">
          <div className="card-body">
            <EmprestimoList emprestimos={emprestimos} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};
export default EmprestimosPage;