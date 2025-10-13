// Importa a biblioteca axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância configurada do axios para comunicação com a API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
});

export default api;
