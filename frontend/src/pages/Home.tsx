// Importações necessárias do React e bibliotecas
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Deputado } from '../types';

const Home = () => {
  // Estados para gerenciar os dados da página
  const [deputados, setDeputados] = useState<Deputado[]>([]); // Lista completa de deputados
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [filtro, setFiltro] = useState(''); // Texto do filtro de busca
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const deputadosPorPagina = 20; // Quantos deputados mostrar por página

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
        
        // Reset para página 1 quando o filtro mudar
        setPaginaAtual(1);
        
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

  // Calcula índices para paginação
  const indiceUltimoDeputado = paginaAtual * deputadosPorPagina;
  const indicePrimeiroDeputado = indiceUltimoDeputado - deputadosPorPagina;
  const deputadosDaPagina = deputados.slice(indicePrimeiroDeputado, indiceUltimoDeputado);
  const totalPaginas = Math.ceil(deputados.length / deputadosPorPagina);

  // Se ainda está carregando, mostra mensagem de loading
  if (loading) return <div>Carregando...</div>;

  console.log('🎨 Renderizando página com', deputados.length, 'deputados');

  return (
    <div className="container">
      <h1>Despesas dos Deputados</h1>
      
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
      <p>🔢 Total de deputados: {deputados.length} | Página {paginaAtual} de {totalPaginas}</p>

      {/* Grid com os cards dos deputados */}
      <div className="deputados-grid">
        {deputadosDaPagina.map((deputado) => (
          <div key={deputado.id} className="deputado-card">
            {/* Mostra foto apenas se existir */}
            {deputado.urlFoto && (
              <img src={deputado.urlFoto} alt={deputado.nome} />
            )}
            <h3>{deputado.nome}</h3>
            <p>{deputado.siglaPartido} - {deputado.siglaUf}</p>
            {/* Link para página de detalhes do deputado */}
            <Link to={`/deputado/${deputado.id}`}>
              <button>Ver Despesas</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginação estilo GitHub */}
      <div className="paginacao">
        {/* Botão Anterior */}
        <button 
          onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
          disabled={paginaAtual === 1}
          className="paginacao-nav"
          title="Página anterior"
        >
          <span className="paginacao-icone">←</span>
          <span className="paginacao-texto">Anterior</span>
        </button>

        {/* Números das páginas */}
        <div className="paginacao-numeros">
          {/* Sempre mostra página 1 */}
          <button
            onClick={() => setPaginaAtual(1)}
            className={`paginacao-numero ${paginaAtual === 1 ? 'ativo' : ''}`}
          >
            1
          </button>

          {/* Reticências se necessário */}
          {paginaAtual > 3 && <span className="paginacao-reticencias">...</span>}

          {/* Páginas ao redor da atual */}
          {[paginaAtual - 1, paginaAtual, paginaAtual + 1].map((num) => {
            if (num <= 1 || num > totalPaginas) return null;
            
            return (
              <button
                key={num}
                onClick={() => setPaginaAtual(num)}
                className={`paginacao-numero ${paginaAtual === num ? 'ativo' : ''}`}
              >
                {num}
              </button>
            );
          })}

          {/* Reticências antes da última página */}
          {paginaAtual < totalPaginas - 2 && <span className="paginacao-reticencias">...</span>}

          {/* Sempre mostra última página (se houver mais de 1) */}
          {totalPaginas > 1 && (
            <button
              onClick={() => setPaginaAtual(totalPaginas)}
              className={`paginacao-numero ${paginaAtual === totalPaginas ? 'ativo' : ''}`}
            >
              {totalPaginas}
            </button>
          )}
        </div>

        {/* Botão Próxima */}
        <button 
          onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
          disabled={paginaAtual === totalPaginas}
          className="paginacao-nav"
          title="Próxima página"
        >
          <span className="paginacao-texto">Próxima</span>
          <span className="paginacao-icone">→</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
