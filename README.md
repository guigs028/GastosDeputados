# Gastos Deputados

Sistema para análise e acompanhamento dos gastos dos deputados.

## Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para construção de aplicações server-side eficientes e escaláveis
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática
- **PostgreSQL** - Sistema de gerenciamento de banco de dados relacional
- **TypeORM** - ORM para TypeScript e JavaScript
- **Axios** - Cliente HTTP para fazer requisições

## Estrutura do Projeto

```
GastosDeputados/
├── backend/                 # Aplicação NestJS
│   ├── src/
│   │   ├── deputados/      # Módulo para gerenciar deputados
│   │   ├── desesas/        # Módulo para gerenciar despesas
│   │   └── ...
│   └── ...
└── README.md
```

## Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd GastosDeputados
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Configure as variáveis de ambiente para conexão com o banco de dados

4. Execute o projeto:
```bash
npm run start:dev
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
