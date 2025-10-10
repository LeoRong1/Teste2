import { Link } from "react-router-dom";

const Home = () => (
  <div className="container mt-5 text-center">
    <header className="mb-5">
      <h1 className="display-4">Bem-vindo ao Sistema</h1>
      <p className="lead text-muted">Gerencie o acervo da sua biblioteca de forma simples e eficiente.</p>
    </header>
    <div className="row justify-content-center">
      <div className="col-md-5 mb-4">
        <div className="card h-100 p-4">
          <div className="card-body">
            <h5 className="card-title">Livros</h5>
            <p className="card-text">Adicione, edite e visualize os livros do acervo.</p>
            <Link to="/livros" className="btn btn-primary">Gerenciar Livros</Link>
          </div>
        </div>
      </div>
      <div className="col-md-5 mb-4">
        <div className="card h-100 p-4">
          <div className="card-body">
            <h5 className="card-title">Empréstimos</h5>
            <p className="card-text">Crie e acompanhe os empréstimos realizados.</p>
            <Link to="/emprestimos" className="btn btn-success">Gerenciar Empréstimos</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Home;