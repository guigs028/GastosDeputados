// Importa a biblioteca axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância configurada do axios para comunicação com a API
const api = axios.create({
  // URL base do backend NestJS - todas as requisições vão para esta URL
  baseURL: "http://localhost:3000",

  // Timeout de 10 segundos - cancela requisição se demorar mais que isso
  timeout: 10000,
});

// Exporta a instância configurada para uso em outros arquivos
// Uso: api.get('/deputados') -> GET http://localhost:3000/deputados
export default api;
