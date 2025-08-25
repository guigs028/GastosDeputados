import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeputadosService } from './deputados.service';
import { DeputadosController } from './deputados.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeputadosController],
  providers: [DeputadosService],
})
export class DeputadosModule {}
