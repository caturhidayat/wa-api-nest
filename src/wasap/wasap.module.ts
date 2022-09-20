import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WasapController } from './wasap.controller';
import { WasapService } from './wasap.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
    ConfigModule,
  ],
  controllers: [WasapController],
  providers: [WasapService],
})
export class WasapModule {}
