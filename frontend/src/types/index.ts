// Definições de tipos TypeScript para garantir tipagem segura

// Interface que define a estrutura de um deputado
// Baseada na resposta da API de Dados Abertos da Câmara
export interface Deputado {
  id: number; // ID único do deputado
  uri?: string; // URI da API
  nomeCivil?: string; // Nome civil completo
  nome?: string; // Nome (para compatibilidade com lista)
  siglaUf?: string; // Estado (para compatibilidade com lista)
  siglaPartido?: string; // Partido (para compatibilidade com lista)
  urlFoto?: string; // URL da foto (para compatibilidade com lista)
  email?: string; // Email (para compatibilidade com lista)
  cpf?: string; // CPF do deputado
  sexo?: string; // Sexo (M/F)
  dataNascimento?: string; // Data de nascimento
  ufNascimento?: string; // UF de nascimento
  municipioNascimento?: string; // Município de nascimento
  escolaridade?: string; // Escolaridade
  ultimoStatus?: {
    id: number;
    uri: string;
    nome: string; // Nome eleitoral
    siglaPartido: string; // Partido atual
    siglaUf: string; // UF atual
    urlFoto: string; // Foto oficial
    email?: string | null;
    situacao?: string; // Ex: "Exercício"
    condicaoEleitoral?: string; // Ex: "Titular"
    gabinete?: {
      nome: string;
      predio: string;
      sala: string;
      andar: string;
      telefone: string;
      email: string;
    };
  };
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
