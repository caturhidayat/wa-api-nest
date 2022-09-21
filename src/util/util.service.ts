import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilService {
  constructor(private prismaService: PrismaService) {}

  async compareDate() {
    const users = await this.prismaService.user.findMany();
    const userDate = await users.map((user) => {
      return user.birthDate;
    });
    console.log(userDate[2]);
    return userDate[2];
  }
}
