import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';

@Injectable()
export class WasapService {
  constructor(private configService: ConfigService) {}

  async sendWasap() {
    const urlBase = 'https://api.kirimwa.id/v1/messages';

    const kirimWasap = await got
      .post(urlBase, {
        headers: {
          Authorization: this.configService.get<string>('WA_API_TOKEN'),
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: '628157708511',
          message:
            'Hello from nest wa use got 🔥, add configModule. this awesome 🎉',
          device_id: 'iphone-7-plus',
          message_type: 'text',
        },
      })
      .json();
    console.log(kirimWasap);
  }
}
