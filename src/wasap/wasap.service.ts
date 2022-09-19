import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import got from 'got';

@Injectable()
export class WasapService {
  constructor(private httpService: HttpService) {}

  async sendWasap() {
    const urlBase = 'https://api.kirimwa.id/v1/messages';

    const kirimWasap = await got
      .post(urlBase, {
        headers: {
          Authorization:
            'Bearer v8,d/<dzoa{@q/nce.jAG,5OOMECGDz>96NPLa{c=95W1@6D-catur',
          'Content-Type': 'application/json',
        },
        json: {
          phone_number: '6285155387624',
          message: 'Hello from nest kirim wasap use got!!!🔥',
          device_id: 'iphone-7-plus',
          message_type: 'text',
        },
      })
      .json();
    console.log(kirimWasap);
  }
}
