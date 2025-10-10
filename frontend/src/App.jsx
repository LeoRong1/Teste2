import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LivrosPage from "./pages/LivroPage";
import EmprestimosPage from "./pages/EmprestimoPage";
import Home from "./pages/HomePage";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/livros" element={<ProtectedRoute roles={['admin', 'operador']}><LivrosPage /></ProtectedRoute>} />
              <Route path="/emprestimos" element={<ProtectedRoute roles={['admin', 'operador']}><EmprestimosPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;