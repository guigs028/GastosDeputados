// Importações necessárias do React e bibliotecas
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { Deputado, Despesa } from '../types';

const DeputadoDetalhes = () => {
  // Hook para capturar parâmetros da URL (no caso, o ID do deputado)
  const { id } = useParams<{ id: string }>();
  
  // Estados para gerenciar os dados da página
  const [deputado, setDeputado] = useState<Deputado | null>(null); // Dados do deputado
  const [despesas, setDespesas] = useState<Despesa[]>([]); // Lista de despesas
  const [loading, setLoading] = useState(true); // Estado de carregamento das despesas
  const [ano, setAno] = useState('2025'); // Ano selecionado para filtrar despesas (2025 atual)
  const [pagina, setPagina] = useState(1); // Página atual para paginação

  // Hook para carregar dados do deputado (executa apenas quando ID muda)
  useEffect(() => {
    const fetchDeputado = async () => {
      try {
        // Busca dados detalhados do deputado específico
        const response = await api.get(`/deputados/${id}`);
        setDeputado(response.data.dados || response.data);
      } catch (error) {
        console.error('Erro ao carregar deputado:', error);
      }
    };

    // Só executa se há um ID válido
    if (id) fetchDeputado();
  }, [id]); // Dependência: executa quando ID muda

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

  // Se ainda não carregou os dados do deputado, mostra loading
  if (!deputado) return <div>Carregando...</div>;

  return (
    <div className="container">
      {/* Link para voltar à página inicial */}
      <Link to="/">← Voltar</Link>
      
      {/* Cabeçalho com informações do deputado */}
      <div className="deputado-header">
        {/* Mostra foto apenas se existir */}
        {deputado.urlFoto && (
          <img src={deputado.urlFoto} alt={deputado.nome} />
        )}
        <div>
          <h1>{deputado.nome}</h1>
          <p>{deputado.siglaPartido} - {deputado.siglaUf}</p>
          {/* Mostra email apenas se existir */}
          {deputado.email && <p>Email: {deputado.email}</p>}
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

      <h2>Despesas - {ano}</h2>
      
      {/* Lista de despesas com loading condicional */}
      {loading ? (
        <div>Carregando despesas...</div>
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

      {/* Controles de paginação */}
      <div className="paginacao">
        <button 
          onClick={() => setPagina(p => Math.max(1, p - 1))} // Página anterior (mín: 1)
          disabled={pagina === 1} // Desabilita se está na primeira página
        >
          Anterior
        </button>
        <span>Página {pagina}</span>
        <button onClick={() => setPagina(p => p + 1)}> {/* Próxima página */}
          Próxima
        </button>
      </div>
    </div>
  );
};

export default DeputadoDetalhes;
