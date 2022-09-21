import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WasapService } from './wasap/wasap.service';
import { WasapController } from './wasap/wasap.controller';
import { WasapModule } from './wasap/wasap.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UtilService } from './util/util.service';
import { UtilModule } from './util/util.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    WasapModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UtilModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController, WasapController],
  providers: [AppService, WasapService, UtilService, PrismaService],
})
export class AppModule {}
