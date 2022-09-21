import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import got from 'got';

@Injectable()
export class WasapService {
  constructor(private configService: ConfigService) {}

  async sendWasap() {
    const prefixUrl = 'messages';

    const kirimWasap = await got
      .post(`${this.configService.get<string>('BASE_URL')}${prefixUrl}`, {
        headers: {
          Authorization: this.configService.get<string>('WA_API_TOKEN'),
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: '6285155387624',
          message:
            'Hello from nest wa use cron task schedule 🔥. this awesome 🎉',
          device_id: 'iphone-7-plus',
          message_type: 'text',
        },
      })
      .json();
    console.log(kirimWasap);
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // taskScheduleSendMessage() {
  //   this.sendWasap();
  // }
}
