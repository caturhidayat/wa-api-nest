import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilModule } from 'src/util/util.module';
import { UtilService } from 'src/util/util.service';
import { WasapController } from './wasap.controller';
import { WasapService } from './wasap.service';

@Module({
  imports: [
    PrismaModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: 5,
      }),
    }),
    ConfigModule,
    UtilModule,
  ],
  controllers: [WasapController],
  providers: [PrismaService, WasapService, UtilService],
})
export class WasapModule {}
