import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from '@prisma/client';
import got from 'got';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WasapService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async taskScheduleSendMessage(): Promise<void> {
    // Find data user in database
    const userData = await this.prismaService.user.findMany();
    // console.log(userData);

    // destructuring data user
    const user = userData.map(({ ...users }) => {
      // console.log(users);
      return users;
    });

    // Filter database base on date birthdaty
    const filterUserData = user.filter(this.compareDate);
    if (!filterUserData || filterUserData.length < 0) {
      console.log(`Cron: Tidak ada yang ulang tahun ditanggal ini`);
    } else {
      this.sendWasap(user);
    }
    console.log(filterUserData.length);
    // loop function send whatsapp to user if already on this date
    // for (let i = 0; i <= user.length; i++) {
    //   // console.log(`loop user: ${filterUserData}`);
    //   this.sendWasap(user[i]);
    // }

    // const users = this.compareDate(userData);
    // console.log(typeof `${filterUserData}`);
    // console.log(typeof filterUserData);

    // console.log(`User Data : ${userData}`);
    // return this.sendWasap(filterUserData);
  }

  compareDate(user): Promise<void> {
    const currentDate = new Date();
    const bulan = user.birthDate.getMonth() + 1;
    const tanggal = user.birthDate.getDate();

    try {
      if (
        bulan === currentDate.getMonth() + 1 &&
        tanggal === currentDate.getDate()
      ) {
        // console.table(`Return User compare: ${user}`);
        // console.log(`Compare: ${user.length}`);
        console.log(user);
        return user;
      }
    } catch (error) {
      // console.error(error);
      console.log(`Catch: Tidak ada yang ulang tahun ditanggal ini`);
    }
  }

  // Function send whatsapp
  async sendWasap(users) {
    const prefixUrl = 'messages';
    // console.log(`User: ${users}`);
    console.log(`send wasap ====`);
    // const user = users;

    // const dataUser = users.map(({ ...user }) => {
    //   return user;
    // });
    // console.log(`Thin Phone Number: ${users.phoneNumber}`);
    // console.log(user.phoneNumber);

    for (let i = 0; i <= users.length; i++) {
      const kirimWasap = await got
        .post(`${this.configService.get<string>('BASE_URL')}${prefixUrl}`, {
          headers: {
            Authorization: this.configService.get<string>('WA_API_TOKEN'),
            'Content-Type': 'application/json',
          },
          json: {
            phone_number: users[i].phoneNumber,
            message: `Hello ${users[i].firstName} ${users[i].lastName} Happy Birthday. from nest WA-API use cron task schedule 🔥. -- use spread object map. this awesome 🎉 == Pesan ini dikirim otomatis dari system ==`,
            device_id: 'iphone-7-plus',
            message_type: 'text',
          },
        })
        .json()
        .then(({ ...rest }) => {
          // console.log(rest);
          console.log(rest.id);
        });
      // const getData = got.get(
      //   `${this.configService.get<string>('BASE_URL')}${prefixUrl}/`,
      // );
      return kirimWasap;
    }
  }

  // Function compare date between now & date in database user
}
