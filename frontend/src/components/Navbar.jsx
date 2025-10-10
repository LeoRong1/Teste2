import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Deseja sair do sistema?')) {
      await logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Sistema de Biblioteca</Link>
        {user && (
          <>
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/livros">Livros</Link>
              <Link className="nav-link" to="/emprestimos">Empréstimos</Link>
            </div>
            <div className="navbar-nav">
              <span className="navbar-text me-3">Olá, {user.email} ({user.role})</span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Sair</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;