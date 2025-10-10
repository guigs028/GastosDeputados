// Importa a biblioteca axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância configurada do axios para comunicação com a API
const api = axios.create({
  // URL base do backend NestJS - todas as requisições vão para esta URL
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
});

// Exporta a instância configurada para uso em outros arquivos
// Uso: api.get('/deputados') -> GET http://localhost:3000/deputados
export default api;
