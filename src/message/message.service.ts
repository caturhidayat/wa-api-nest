import got from 'got';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async birthdayUser() {
    try {
      const users = await this.prismaService.user.findMany({});

      users.map(async (user) => {
        if (this.checkBirtdate(user)) {
          this.sendMessage(user);
        } else {
          console.log("Today is not user's birthday");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendMessage(user: User) {
    const prefixUrl = 'messages';

    got
      .post(`${this.configService.get<string>('BASE_URL')}${prefixUrl}`, {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>(
            'WA_API_TOKEN',
          )}`,
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: user.phoneNumber,
          message: `Halo, ${user.firstName} ${user.lastName}. Selamat ulang tahun! Semoga panjang umur dan sehat selalu ya!`,
          device_id: this.configService.get<string>('DEVICE_ID'),
          message_type: 'text',
        },
      })
      .json();
  }

  // Check if today is user's birthday match with birthdate in database
  checkBirtdate(user: User) {
    const today = new Date();
    const birthDate = new Date(user.birthDate);
    if (
      today.getDate() === birthDate.getDate() &&
      today.getMonth() + 1 === birthDate.getMonth() + 1
    ) {
      return true;
    }
  }
}
