import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeputadosService } from './deputados.service';
import { CreateDeputadoDto } from './dto/create-deputado.dto';
import { UpdateDeputadoDto } from './dto/update-deputado.dto';

@Controller('deputados')
export class DeputadosController {
  constructor(private readonly deputadosService: DeputadosService) {}

  @Post()
  create(@Body() createDeputadoDto: CreateDeputadoDto) {
    return this.deputadosService.create(createDeputadoDto);
  }

  @Get()
  findAll(@Query('filtro') filtro?: string) {
    return this.deputadosService.findAll({ filtro });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deputadosService.findOne(+id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.deputadosService.findByName(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeputadoDto: UpdateDeputadoDto,
  ) {
    return this.deputadosService.update(+id, updateDeputadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deputadosService.remove(+id);
  }
}
