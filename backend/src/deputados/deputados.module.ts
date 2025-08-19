import { Module } from '@nestjs/common';
import { DeputadosService } from './deputados.service';
import { DeputadosController } from './deputados.controller';

@Module({
  controllers: [DeputadosController],
  providers: [DeputadosService],
})
export class DeputadosModule {}
