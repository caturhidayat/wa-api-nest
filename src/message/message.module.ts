import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageController } from './message.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [MessageController],
  providers: [ConfigService, PrismaService],
})
export class MessageModule {}
