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
      if (activeTab === "listar") {
        carregarEmprestimos();
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao criar empréstimo");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestão de Empréstimos</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "criar" ? "active" : ""}`} onClick={() => setActiveTab("criar")}>
            Criar Empréstimo
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