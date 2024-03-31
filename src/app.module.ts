import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    MessageModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    CronModule,
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService, PrismaService, CronService],
})
export class AppModule {}
