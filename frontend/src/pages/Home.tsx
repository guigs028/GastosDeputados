// Importações necessárias do React e bibliotecas
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Deputado } from '../types';

const Home = () => {
  // Estados para gerenciar os dados da página
  const [deputados, setDeputados] = useState<Deputado[]>([]); // Lista de deputados
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [filtro, setFiltro] = useState(''); // Texto do filtro de busca

  // Hook que executa quando o componente monta ou quando o filtro muda
  useEffect(() => {
    const fetchDeputados = async () => {
      try {
        console.log('🔍 Buscando deputados...', filtro ? `com filtro: ${filtro}` : 'sem filtro');
        
        // Faz requisição para o backend buscando deputados
        const response = await api.get('/deputados', {
          // Se há filtro, envia como parâmetro; senão, envia objeto vazio
          params: filtro ? { filtro } : {},
        });
        
        console.log('✅ Resposta da API:', response.data);
        console.log('📊 Dados dos deputados:', response.data.dados || response.data);
        
        // Atualiza o estado com os dados recebidos
        // Tenta acessar 'dados' primeiro, se não existir usa a resposta direta
        const deputadosData = response.data.dados || response.data;
        setDeputados(deputadosData);
        
        console.log('🏛️ Total de deputados carregados:', deputadosData.length);
      } catch (error) {
        // Em caso de erro, exibe no console
        console.error('❌ Erro ao carregar deputados:', error);
      } finally {
        // Independente de sucesso ou erro, para o loading
        setLoading(false);
      }
    };

    // Executa a função de busca
    fetchDeputados();
  }, [filtro]); // Dependência: executa novamente quando 'filtro' muda

  // Função para lidar com mudanças no campo de filtro
  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value); // Atualiza o estado do filtro
  };

  // Se ainda está carregando, mostra mensagem de loading
  if (loading) return <div>Carregando...</div>;

  console.log('🎨 Renderizando página com', deputados.length, 'deputados');

  return (
    <div className="container">
      <h1>Gastos dos Deputados</h1>
      
      {/* Campo de filtro para buscar deputados */}
      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar por nome, partido ou UF..."
          value={filtro}
          onChange={handleFiltroChange}
        />
      </div>

      {/* Mostra informação de debug */}
      <p>🔢 Total de deputados: {deputados.length}</p>

      {/* Grid com os cards dos deputados */}
      <div className="deputados-grid">
        {deputados.map((deputado) => (
          <div key={deputado.id} className="deputado-card">
            {/* Mostra foto apenas se existir */}
            {deputado.urlFoto && (
              <img src={deputado.urlFoto} alt={deputado.nome} />
            )}
            <h3>{deputado.nome}</h3>
            <p>{deputado.siglaPartido} - {deputado.siglaUf}</p>
            {/* Link para página de detalhes do deputado */}
            <Link to={`/deputado/${deputado.id}`}>
              <button>Ver Gastos</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
