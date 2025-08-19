import { Module } from '@nestjs/common';
import { DesesasService } from './desesas.service';
import { DesesasController } from './desesas.controller';

@Module({
  controllers: [DesesasController],
  providers: [DesesasService],
})
export class DesesasModule {}
