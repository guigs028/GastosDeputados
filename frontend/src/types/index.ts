// Tipos TypeScript baseados na API de Dados Abertos da Câmara

export interface Deputado {
  id: number;
  uri?: string;
  nomeCivil?: string;
  nome?: string;
  siglaUf?: string;
  siglaPartido?: string;
  urlFoto?: string;
  email?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: string;
  ufNascimento?: string;
  municipioNascimento?: string;
  escolaridade?: string;
  ultimoStatus?: {
    id: number;
    uri: string;
    nome: string;
    siglaPartido: string;
    siglaUf: string;
    urlFoto: string;
    email?: string | null;
    situacao?: string;
    condicaoEleitoral?: string;
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

export interface Despesa {
  codDocumento: number;
  dataDocumento: string;
  mes: number;
  ano: number;
  tipoDespesa: string;
  codTipoDocumento: number;
  tipoDocumento: string;
  codFornecedor: number;
  nomeFornecedor: string;
  valorDocumento: number;
  valorGlosa: number;
  valorLiquido: number;
}
