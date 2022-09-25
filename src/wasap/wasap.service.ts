import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from '@prisma/client';
import got from 'got';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class WasapService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private utilService: UtilService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async taskScheduleSendMessage(): Promise<void> {
    const userData = await this.prismaService.user.findMany();
    const filterUserData = userData.filter(this.compareDate);
    if (!filterUserData) {
      console.log(`Cron: Tidak ada yang ulang tahun ditanggal ini`);
    }
    const user = filterUserData.map(({ id, ...users }) => {
      console.log(id);
      console.log(users);
      // console.log(rest);
      return users;
    });
    for (let i = 0; i <= user.length; i++) {
      console.log(`loop user: ${user}`);
      this.sendWasap(user[i]);
    }
  }

  sendWasap(users) {
    const prefixUrl = 'messages';
    console.log(`User: ${users}`);
    // const dataUser = users.map((user) => {
    //   return user;
    // });

    const kirimWasap = got
      .post(`${this.configService.get<string>('BASE_URL')}${prefixUrl}`, {
        headers: {
          Authorization: this.configService.get<string>('WA_API_TOKEN'),
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: users.phoneNumber,
          message: `Hello ${users.firstName} from nest wa use cron task schedule 🔥. this awesome 🎉`,
          device_id: 'iphone-7-plus',
          message_type: 'text',
        },
      })
      .json();
    console.log(kirimWasap);
  }

  compareDate(user): Promise<User> {
    const currentDate = new Date();
    const bulan = user.birthDate.getMonth() + 1;
    const tanggal = user.birthDate.getDate();

    try {
      if (
        bulan === currentDate.getMonth() + 1 &&
        tanggal === currentDate.getDate()
      ) {
        console.table(`Return User compare: ${user}`);
        return user;
      }
    } catch (error) {
      console.error(error);
      console.log(`Catch: Tidak ada yang ulang tahun ditanggal ini`);
    }
  }
}
