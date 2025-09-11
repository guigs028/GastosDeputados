// Definições de tipos TypeScript para garantir tipagem segura

// Interface que define a estrutura de um deputado
// Baseada na resposta da API de Dados Abertos da Câmara
export interface Deputado {
  id: number; // ID único do deputado
  nome: string; // Nome completo do deputado
  siglaUf: string; // Estado (SP, RJ, MG, etc.)
  siglaPartido: string; // Partido político (PT, PSDB, etc.)
  urlFoto?: string; // URL da foto (opcional)
  email?: string; // Email do deputado (opcional)
}

// Interface que define a estrutura de uma despesa/gasto
// Baseada na resposta da API de Dados Abertos da Câmara
export interface Despesa {
  codDocumento: number; // Código do documento da despesa
  dataDocumento: string; // Data do documento (formato string)
  mes: number; // Mês da despesa (1-12)
  ano: number; // Ano da despesa
  tipoDespesa: string; // Tipo: "COMBUSTÍVEL", "ALIMENTAÇÃO", etc.
  codTipoDocumento: number; // Código do tipo de documento
  tipoDocumento: string; // Descrição do tipo de documento
  codFornecedor: number; // Código do fornecedor
  nomeFornecedor: string; // Nome do fornecedor/empresa
  valorDocumento: number; // Valor original do documento
  valorGlosa: number; // Valor da glosa (desconto)
  valorLiquido: number; // Valor final pago (documento - glosa)
}
