import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WasapService } from './wasap/wasap.service';
import { WasapController } from './wasap/wasap.controller';
import { WasapModule } from './wasap/wasap.module';

@Module({
  imports: [WasapModule],
  controllers: [AppController, WasapController],
  providers: [AppService, WasapService],
})
export class AppModule {}
