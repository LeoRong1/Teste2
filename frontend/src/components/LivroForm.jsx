import { useState } from "react";

const LivroForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    quantidade_disponivel: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.autor.trim()) newErrors.autor = "Autor é obrigatório";
    if (!formData.quantidade_disponivel || parseInt(formData.quantidade_disponivel) < 0) {
      newErrors.quantidade_disponivel = "Quantidade deve ser maior ou igual a zero";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ titulo: "", autor: "", isbn: "", quantidade_disponivel: "" });
      setErrors({});
    } catch (error) {
      console.log("Erro ao cadastrar livro:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0"><i className="bi bi-plus-circle me-2"></i>Cadastrar Novo Livro</h5>
      </div>
      <div className="card-body">
        <form noValidate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="titulo" className="form-label">Título do Livro</label>
              <input type="text" className={`form-control ${errors.titulo ? "is-invalid" : ""}`} id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Digite o título do livro" />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="autor" className="form-label">Autor</label>
              <input type="text" className={`form-control ${errors.autor ? "is-invalid" : ""}`} id="autor" name="autor" value={formData.autor} onChange={handleInputChange} placeholder="Digite o nome do autor" />
              {errors.autor && <div className="invalid-feedback">{errors.autor}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input type="text" className="form-control" id="isbn" name="isbn" value={formData.isbn} onChange={handleInputChange} placeholder="Digite o ISBN" />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="quantidade_disponivel" className="form-label">Quantidade</label>
              <input type="number" min="0" className={`form-control ${errors.quantidade_disponivel ? "is-invalid" : ""}`} id="quantidade_disponivel" name="quantidade_disponivel" value={formData.quantidade_disponivel} onChange={handleInputChange} placeholder="0" />
              {errors.quantidade_disponivel && <div className="invalid-feedback">{errors.quantidade_disponivel}</div>}
            </div>
            <div className="col-md-3 d-flex align-items-end mb-3">
              <button disabled={isLoading} className="btn btn-primary w-100" type="submit">
                {isLoading ? 'Cadastrando...' : 'Cadastrar Livro'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivroForm;