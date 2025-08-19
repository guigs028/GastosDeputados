import { PartialType } from '@nestjs/mapped-types';
import { CreateDesesaDto } from './create-desesa.dto';

export class UpdateDesesaDto extends PartialType(CreateDesesaDto) {}
