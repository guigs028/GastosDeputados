import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeputadosModule } from './deputados/deputados.module';
import { DesesasModule } from './desesas/desesas.module';

@Module({
  imports: [DeputadosModule, DesesasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
