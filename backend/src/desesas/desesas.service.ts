import { Injectable } from '@nestjs/common';
import { CreateDesesaDto } from './dto/create-desesa.dto';
import { UpdateDesesaDto } from './dto/update-desesa.dto';

@Injectable()
export class DesesasService {
  create(createDesesaDto: CreateDesesaDto) {
    return 'This action adds a new desesa';
  }

  findAll() {
    return `This action returns all desesas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desesa`;
  }

  update(id: number, updateDesesaDto: UpdateDesesaDto) {
    return `This action updates a #${id} desesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} desesa`;
  }
}
