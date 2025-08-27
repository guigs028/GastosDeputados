import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { DeputadosService } from './deputados.service';

@Controller('deputados')
export class DeputadosController {
  constructor(private readonly deputadosService: DeputadosService) {}

  @Get()
  findAll(@Query('filtro') filtro?: string) {
    return this.deputadosService.findAll({ filtro });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deputadosService.findOne(+id);
  }

  @Get(':id/despesas')
  findDespesas(
    @Param('id') id: string,
    @Query('ano') ano?: string,
    @Query('pagina') pagina?: string,
  ) {
    return this.deputadosService.findDespesas(+id, { ano, pagina });
  }
}
