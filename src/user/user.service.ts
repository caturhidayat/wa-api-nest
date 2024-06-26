import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(userDto: UserDto): Promise<User> {
    const createUser = await this.prismaService.user.create({
      data: userDto,
    });
    return createUser;
  }

  async findAll() {
    const getAll = await this.prismaService.user.findMany();
    return getAll;
  }

  async findOne(id: number) {
    const getOne = await this.prismaService.user.findUnique({
      where: { id },
    });
    return getOne;
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: userDto,
    });
    return updateUser;
  }

  async remove(id: number) {
    const del = await this.prismaService.user.delete({
      where: { id },
    });
    return del;
  }
}
