import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  async sendWasap(users) {
    const prefixUrl = 'messages';

    const dataUser = users.map((user) => {
      return user;
    });
    // const arrLength = users.length();

    // for (const user in users) {
    //   console.log(users);
    //   console.log(users.firstName);
    //   users[user];
    // }

    // console.log(dataUser);
    console.log(dataUser[0].firstName);

    const kirimWasap = await got
      .post(`${this.configService.get<string>('BASE_URL')}${prefixUrl}`, {
        headers: {
          Authorization: this.configService.get<string>('WA_API_TOKEN'),
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: dataUser[0].phoneNumber,
          message: `Hello ${dataUser[0].firstName} from nest wa use cron task schedule 🔥. this awesome 🎉`,
          device_id: 'iphone-7-plus',
          message_type: 'text',
        },
      })
      .json();
    console.log(kirimWasap);
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async taskScheduleSendMessage() {
    const compareData = await this.utilService.compareDate().then((user) => {
      setTimeout(() => {
        // const users = user.map((user) => user);
        // console.log(`Data User: ${users}`);
        // this.sendWasap(users);
        this.sendWasap(user);
      }, 1000);
    });
    // .then(() => {
    //   setTimeout((user: { firstName: any }) => {
    //     console.log(`data compare`);
    //     // this.sendWasap(compareData);
    //   }, 1200);
    // });
  }
}
