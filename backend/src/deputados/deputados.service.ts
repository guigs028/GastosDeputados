import { Injectable } from '@nestjs/common';
import { CreateDeputadoDto } from './dto/create-deputado.dto';
import { UpdateDeputadoDto } from './dto/update-deputado.dto';

@Injectable()
export class DeputadosService {
  create(createDeputadoDto: CreateDeputadoDto) {
    return 'This action adds a new deputado';
  }

  findAll() {
    return `This action returns all deputados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deputado`;
  }

  update(id: number, updateDeputadoDto: UpdateDeputadoDto) {
    return `This action updates a #${id} deputado`;
  }

  remove(id: number) {
    return `This action removes a #${id} deputado`;
  }
}
