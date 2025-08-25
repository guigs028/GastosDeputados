export interface Deputado {
  id: number;
  nome: string;
  siglaUf: string;
  siglaPartido: string;
  // adicione outros campos conforme necessário
}

import { Injectable } from '@nestjs/common';
import { CreateDeputadoDto } from './dto/create-deputado.dto';
import { UpdateDeputadoDto } from './dto/update-deputado.dto';
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
    const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`;
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(url),
    );
    return response.data;
  }

  create(createDeputadoDto: CreateDeputadoDto) {
    return 'This action adds a new deputado';
  }

  update(id: number, updateDeputadoDto: UpdateDeputadoDto) {
    return `This action updates a #${id} deputado`;
  }

  remove(id: number) {
    return `This action removes a #${id} deputado`;
  }
}
