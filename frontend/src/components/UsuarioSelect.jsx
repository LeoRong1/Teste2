import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import apiService from "../services/api";

const UsuarioSelect = forwardRef(({ onUsuarioSelect }, ref) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSearchTerm('');
      setUsuarios([]);
    }
  }));

  useEffect(() => {
    if (!isSelecting && searchTerm.length >= 2) {
      buscarUsuarios();
    }
    if (isSelecting) {
      setIsSelecting(false);
    }
  }, [searchTerm]);

  const handleSelect = (usuario) => {
    setIsSelecting(true);
    onUsuarioSelect(usuario);
    setSearchTerm(usuario.nome);
    setUsuarios([]);
  };

  const buscarUsuarios = async () => {
    try {
      const response = await apiService.getUsuarios(searchTerm);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Usuário *</label>
      <input
        type="text"
        className="form-control"
        placeholder="Digite o nome do usuário"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {usuarios.length > 0 && (
        <div className="list-group mt-1">
          {usuarios.map((usuario) => (
            <button
              key={usuario.id}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(usuario)}
            >
              {usuario.nome} ({usuario.email})
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

UsuarioSelect.displayName = 'UsuarioSelect';
export default UsuarioSelect;