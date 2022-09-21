import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from './util.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, UtilService],
})
export class UtilModule {}
