// Importações necessárias para roteamento e componentes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeputadoDetalhes from './pages/DeputadoDetalhes';
import './App.css';

function App() {
  return (
    // Router: Habilita o roteamento em toda a aplicação
    <Router>
      <div className="App">
        {/* Routes: Define as rotas da aplicação */}
        <Routes>
          {/* Rota raiz: Lista de deputados */}
          <Route path="/" element={<Home />} />
          
          {/* Rota dinâmica: Detalhes do deputado com parâmetro :id */}
          {/* Exemplo: /deputado/123 -> mostra gastos do deputado ID 123 */}
          <Route path="/deputado/:id" element={<DeputadoDetalhes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;