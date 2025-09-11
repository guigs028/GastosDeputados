// Importações necessárias do React e ReactDOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ponto de entrada da aplicação React
// Este arquivo é responsável por montar a aplicação no DOM

// Busca o elemento HTML com id 'root' no index.html
const rootElement = document.getElementById('root')!

// Cria a raiz da aplicação React
const root = createRoot(rootElement)

// Renderiza a aplicação dentro do StrictMode
// StrictMode: Modo de desenvolvimento que ajuda a detectar problemas
root.render(
  <StrictMode>
    {/* Componente principal da aplicação */}
    <App />
  </StrictMode>,
)

// Fluxo de execução:
// 1. index.html carrega e executa este arquivo
// 2. Este arquivo monta o componente <App /> no elemento #root
// 3. App.tsx configura o roteamento e renderiza as páginas
// 4. Cada página (Home, DeputadoDetalhes) faz suas requisições e renderiza conteúdo