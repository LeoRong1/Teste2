import { Link } from "react-router-dom";

const Home = () => (
  <div className="container mt-4">
    <h1>Bem-vindo ao Sistema de Biblioteca</h1>
    <div className="row mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5>Livros</h5>
            <p>Gerencie os livros do acervo</p>
            <Link to="/livros" className="btn btn-primary">Ir para Livros</Link>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5>Empréstimos</h5>
            <p>Crie e visualize os empréstimos</p>
            <Link to="/emprestimos" className="btn btn-success">Ir para Empréstimos</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Home;