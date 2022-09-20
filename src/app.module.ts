import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WasapService } from './wasap/wasap.service';
import { WasapController } from './wasap/wasap.controller';
import { WasapModule } from './wasap/wasap.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WasapModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, WasapController],
  providers: [AppService, WasapService],
})
export class AppModule {}
