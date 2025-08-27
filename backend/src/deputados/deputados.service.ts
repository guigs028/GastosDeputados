export interface Deputado {
  id: number;
  nome: string;
  siglaUf: string;
  siglaPartido: string;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class DeputadosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll({ filtro }: { filtro?: string }) {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(url),
    );
    let deputados: Deputado[] = response.data.dados as Deputado[];

    if (filtro) {
      const termo = filtro.toLowerCase();
      deputados = deputados.filter(
        (dep: Deputado) =>
          dep.nome.toLowerCase().includes(termo) ||
          dep.siglaUf.toLowerCase().includes(termo) ||
          dep.siglaPartido.toLowerCase().includes(termo),
      );
    }
    return deputados;
  }

  async findOne(id: number) {
    try {
      const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`;
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(url),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error fetching deputado with id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findDespesas(
    id: number,
    { ano, pagina }: { ano?: string; pagina?: string },
  ) {
    try {
      let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas`;
      const params: string[] = [];
      if (ano) params.push(`ano=${ano}`);
      if (pagina) params.push(`pagina=${pagina}`);
      if (params.length) url += '?' + params.join('&');
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(url),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error fetching despesas for deputado with id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
