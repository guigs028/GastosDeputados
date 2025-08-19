import { PartialType } from '@nestjs/mapped-types';
import { CreateDeputadoDto } from './create-deputado.dto';

export class UpdateDeputadoDto extends PartialType(CreateDeputadoDto) {}
