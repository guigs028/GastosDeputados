import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DesesasService } from './desesas.service';
import { CreateDesesaDto } from './dto/create-desesa.dto';
import { UpdateDesesaDto } from './dto/update-desesa.dto';

@Controller('desesas')
export class DesesasController {
  constructor(private readonly desesasService: DesesasService) {}

  @Post()
  create(@Body() createDesesaDto: CreateDesesaDto) {
    return this.desesasService.create(createDesesaDto);
  }

  @Get()
  findAll() {
    return this.desesasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desesasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesesaDto: UpdateDesesaDto) {
    return this.desesasService.update(+id, updateDesesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desesasService.remove(+id);
  }
}
