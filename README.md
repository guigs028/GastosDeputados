# 🏛️ Gastos Deputados - Transparência Parlamentar

Sistema de transparência para análise e acompanhamento dos gastos dos deputados federais brasileiros, utilizando dados da API de Dados Abertos da Câmara dos Deputados.

![Status](https://img.shields.io/badge/status-online-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Sobre o Projeto

Aplicação web moderna e intuitiva que permite aos cidadãos brasileiros acompanhar de forma transparente os gastos parlamentares. O sistema oferece:

- 🔍 **Busca e filtros avançados** por nome, partido e estado
- 📊 **Visualização de dados** através de gráficos interativos (Pie Chart e Bar Chart)
- 💰 **Detalhamento de despesas** por tipo, fornecedor e período
- 📱 **Interface responsiva** que funciona em desktop e mobile
- ⚡ **Performance otimizada** com paginação e skeleton loading

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e extremamente rápida
- **React Router DOM** - Roteamento de páginas
- **Axios** - Cliente HTTP para requisições
- **Chart.js + react-chartjs-2** - Biblioteca para gráficos interativos
- **CSS3** - Estilização customizada com tema institucional azul

### Backend
- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Tipagem estática para maior segurança
- **Axios** - Integração com API de Dados Abertos
- **CORS** - Configurado para acesso cross-origin

### Fonte de Dados
- **API Dados Abertos da Câmara dos Deputados** - [dadosabertos.camara.leg.br](https://dadosabertos.camara.leg.br/)

## 📁 Estrutura do Projeto

```
GastosDeputados/
├── backend/                          # API NestJS
│   ├── src/
│   │   ├── deputados/               # Módulo de deputados
│   │   │   ├── deputados.controller.ts
│   │   │   ├── deputados.service.ts
│   │   │   └── deputados.module.ts
│   │   ├── app.module.ts            # Módulo raiz
│   │   └── main.ts                  # Entry point com CORS
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   │   ├── GraficoGastos.tsx   # Componente de gráficos
│   │   │   └── LoadingSkeleton.tsx  # Skeletons de loading
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Lista de deputados
│   │   │   └── DeputadoDetalhes.tsx # Detalhes e despesas
│   │   ├── services/
│   │   │   └── api.ts               # Configuração Axios
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript interfaces
│   │   ├── App.tsx                  # Componente principal
│   │   ├── App.css                  # Estilos globais
│   │   └── main.tsx                 # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Git

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/guigs028/GastosDeputados.git
cd GastosDeputados
```

### 2️⃣ Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run start:dev

# Backend estará rodando em http://localhost:3000
```

### 3️⃣ Configure o Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Crie arquivo .env.local
echo "VITE_API_URL=http://localhost:3000" > .env.local

# Execute em modo desenvolvimento
npm run dev

# Frontend estará rodando em http://localhost:5173
```

### 4️⃣ Acesse a Aplicação

Abra [http://localhost:5173](http://localhost:5173) no navegador.

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run start:dev    # Desenvolvimento com hot-reload
npm run build        # Build para produção
npm run start:prod   # Executa build de produção
```

### Frontend

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
```

## 📊 Funcionalidades

### Página Inicial
- Lista paginada de todos os deputados em exercício (20 por página)
- Campo de busca por nome, partido ou UF
- Skeleton loading durante carregamento
- Navegação estilo GitHub com reticências

### Página de Detalhes do Deputado
- Informações completas do deputado (foto, nome, partido, estado, contato)
- Gráfico de Pizza: Distribuição de gastos por tipo de despesa
- Gráfico de Barras: Top 8 categorias com maiores gastos
- Lista paginada de todas as despesas do ano selecionado
- Filtro por ano (2022-2025)
- Informações detalhadas de cada despesa (fornecedor, valor, data)

### Recursos de UX
- Skeleton loaders profissionais durante carregamento
- Paginação inteligente com reticências
- Breadcrumbs para navegação
- Design responsivo para mobile
- Cores institucionais profissionais (#1e3a5f, #2c5282)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Guilherme** (guigs028)

- GitHub: [@guigs028](https://github.com/guigs028)
- LinkedIn: [@GuilhermeDentzien](https://www.linkedin.com/in/guilhermedentzien/)

## 🙏 Agradecimentos

- **Câmara dos Deputados** - Pela disponibilização da API de Dados Abertos
- **Comunidade Open Source** - Pelas ferramentas e bibliotecas utilizadas

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
