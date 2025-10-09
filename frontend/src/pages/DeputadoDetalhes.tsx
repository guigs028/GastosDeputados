// Importações necessárias do React e bibliotecas
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { Deputado, Despesa } from '../types';
import GraficoGastos from '../components/GraficoGastos';
import { DeputadoHeaderSkeleton, DespesaCardSkeleton } from '../components/LoadingSkeleton';

const DeputadoDetalhes = () => {
  // Hook para capturar parâmetros da URL (no caso, o ID do deputado)
  const { id } = useParams<{ id: string }>();
  
  // Estados para gerenciar os dados da página
  const [deputado, setDeputado] = useState<Deputado | null>(null); // Dados do deputado
  const [despesas, setDespesas] = useState<Despesa[]>([]); // Lista de despesas (paginadas)
  const [todasDespesas, setTodasDespesas] = useState<Despesa[]>([]); // Todas despesas do ano (para gráficos)
  const [loading, setLoading] = useState(true); // Estado de carregamento das despesas
  const [ano, setAno] = useState('2025'); // Ano selecionado para filtrar despesas (2025 atual)
  const [pagina, setPagina] = useState(1); // Página atual para paginação

  // Calcula o total de páginas baseado no total de despesas (100 itens por página padrão da API)
  const itensPorPagina = 100;
  const totalPaginas = Math.ceil(todasDespesas.length / itensPorPagina) || 1;

  useEffect(() => {
  setPagina(1); // Volta para página 1
    }, [ano]); // Executa quando ano muda

  // Hook para carregar dados do deputado (executa apenas quando ID muda)
  useEffect(() => {
    const fetchDeputado = async () => {
      try {
        // Busca dados detalhados do deputado específico
        const response = await api.get(`/deputados/${id}`);
        console.log('Resposta da API deputado:', response.data);
        const dadosDeputado = response.data.dados || response.data;
        console.log('Dados do deputado processados:', dadosDeputado);
        setDeputado(dadosDeputado);
      } catch (error) {
        console.error('Erro ao carregar deputado:', error);
      }
    };

    // Só executa se há um ID válido
    if (id) fetchDeputado();
  }, [id]); // Dependência: executa quando ID muda

  // Hook para carregar TODAS as despesas do ano (para gráficos)
  useEffect(() => {
    const fetchTodasDespesas = async () => {
      try {
        // Busca todas as despesas do ano (sem paginação limitada)
        const todasPaginas: Despesa[] = [];
        let paginaAtual = 1;
        let continuarBuscando = true;

        // Busca todas as páginas até não haver mais dados
        while (continuarBuscando) {
          const response = await api.get(`/deputados/${id}/despesas`, {
            params: { ano, pagina: paginaAtual, itens: 100 },
          });
          const dados = response.data.dados || response.data;
          
          if (dados.length > 0) {
            todasPaginas.push(...dados);
            paginaAtual++;
          } else {
            continuarBuscando = false;
          }

          // Limite de segurança para evitar loop infinito
          if (paginaAtual > 50) break;
        }

        setTodasDespesas(todasPaginas);
        console.log('Total de despesas carregadas:', todasPaginas.length);
      } catch (error) {
        console.error('Erro ao carregar todas despesas:', error);
      }
    };

    if (id) fetchTodasDespesas();
  }, [id, ano]); // Executa quando ID ou ano mudam

  // Hook para carregar despesas (executa quando ID, ano ou página mudam)
  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        setLoading(true); // Inicia loading
        // Busca despesas do deputado com filtros de ano e paginação
        const response = await api.get(`/deputados/${id}/despesas`, {
          params: { ano, pagina }, // Envia ano e página como parâmetros
        });
        setDespesas(response.data.dados || response.data);
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setLoading(false); // Para o loading
      }
    };

    // Só executa se há um ID válido
    if (id) fetchDespesas();
  }, [id, ano, pagina]); // Dependências: executa quando qualquer um desses muda

  // Loading do deputado (primeira vez que carrega)
  if (!deputado) {
    return (
      <div className="container">
        <Link to="/">← Voltar</Link>
        <DeputadoHeaderSkeleton />
        
        <div className="filtros">
          <select disabled>
            <option>2025</option>
          </select>
        </div>

        <h2>Detalhamento de Depesas - Exercício {ano}</h2>
        
        {/* Lista de skeletons de despesas */}
        <div className="skeleton-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <DespesaCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Link para voltar à página inicial */}
      <Link to="/">← Voltar</Link>
      
      {/* Cabeçalho com informações do deputado */}
      <div className="deputado-header">
        {/* Mostra foto apenas se existir */}
        {deputado.ultimoStatus?.urlFoto ? (
          <img src={deputado.ultimoStatus.urlFoto} alt={deputado.ultimoStatus?.nome || deputado.nomeCivil} />
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px'}}>
            👤
          </div>
        )}
        <div>
          <h1>{deputado.ultimoStatus?.nome || deputado.nomeCivil || 'Nome não disponível'}</h1>
          <p>
            {deputado.ultimoStatus?.siglaPartido || '?'} - {deputado.ultimoStatus?.siglaUf || '?'}
          </p>
          {/* Mostra email do gabinete */}
          {deputado.ultimoStatus?.gabinete?.email && (
            <p>✉️ {deputado.ultimoStatus.gabinete.email}</p>
          )}
          {/* Mostra situação do deputado */}
          {deputado.ultimoStatus?.situacao && (
            <p><strong>Situação:</strong> {deputado.ultimoStatus.situacao}</p>
          )}
        </div>
      </div>

      {/* Filtros para selecionar ano */}
      <div className="filtros">
        <select value={ano} onChange={(e) => setAno(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Gráficos de gastos - Mostra apenas quando há despesas */}
      {!loading && todasDespesas.length > 0 && (
        <GraficoGastos despesas={todasDespesas} ano={ano} />
      )}

      <h2>Despesas - {ano}</h2>
      
      {/* Loading das despesas (quando muda ano/página) */}
      {loading ? (
        <div className="despesas-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <DespesaCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="despesas-list">
          {/* Mapeia cada despesa em um card */}
          {despesas.map((despesa, index) => (
            <div key={index} className="despesa-card">
              <h4>{despesa.tipoDespesa}</h4>
              <p><strong>Fornecedor:</strong> {despesa.nomeFornecedor}</p>
              {/* Formata valor para 2 casas decimais */}
              <p><strong>Valor:</strong> R$ {despesa.valorLiquido?.toFixed(2)}</p>
              {/* Formata data para formato brasileiro */}
              <p><strong>Data:</strong> {new Date(despesa.dataDocumento).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Paginação estilo GitHub (igual à home) */}
      <div className="paginacao">
        {/* Botão Anterior */}
        <button 
          onClick={() => setPagina(p => Math.max(1, p - 1))}
          disabled={pagina === 1}
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
            onClick={() => setPagina(1)}
            className={`paginacao-numero ${pagina === 1 ? 'ativo' : ''}`}
          >
            1
          </button>

          {/* Reticências se necessário */}
          {pagina > 3 && <span className="paginacao-reticencias">...</span>}

          {/* Páginas ao redor da atual */}
          {[pagina - 1, pagina, pagina + 1].map((num) => {
            if (num <= 1 || num >= totalPaginas) return null;
            
            return (
              <button
                key={num}
                onClick={() => setPagina(num)}
                className={`paginacao-numero ${pagina === num ? 'ativo' : ''}`}
              >
                {num}
              </button>
            );
          })}

          {/* Reticências antes da última página */}
          {pagina < totalPaginas - 2 && <span className="paginacao-reticencias">...</span>}

          {/* Sempre mostra última página (se houver mais de 1) */}
          {totalPaginas > 1 && (
            <button
              onClick={() => setPagina(totalPaginas)}
              className={`paginacao-numero ${pagina === totalPaginas ? 'ativo' : ''}`}
            >
              {totalPaginas}
            </button>
          )}
        </div>

        {/* Botão Próxima */}
        <button 
          onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
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

export default DeputadoDetalhes;
