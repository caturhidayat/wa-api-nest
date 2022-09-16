import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class WasapService {
  constructor(private httpService: HttpService) {}

  async sendWasap() {
    const urlBase = 'https://api.kirimwa.id/v1/messages';
    // const HeaderAPI = {
    //   Authorization:
    //     'Bearer v8,d/<dzoa{@q/nce.jAG,5OOMECGDz>96NPLa{c=95W1@6D-catur',
    //   'Content-Type': 'application/json',
    // };
    const message = {
      phone_number: '628157708511',
      message: 'Hello from nest kirim wasap',
      device_id: 'iphone-7-plus',
      message_type: 'text',
    };

    // try {
    //     const send = await this.httpService.post(urlBase, message);
    //     // console.log(send)
    //     console.log(`wasap send to ${message.phone_number}!`)
    //     return send;
    // } catch (err) {
    //     console.log(err);
    //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }

    // Axios methode
    try {
      const send = await axios.post(urlBase, message);
      // console.log(send)
      console.log(`wasap send to ${message.phone_number}!`);
      return send;
    } catch (err) {
      console.log(err);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  getMessage() {
    const urlBase =
      'https://api.kirimwa.id/v1/messages/kwid-ab51818a9d704402882a09fc275';

    const ambilMessage = axios.get(urlBase).then((res) => {
      console.log({ data: res.data, heads: res.headers });
    });
    console.log(ambilMessage);
    // return ambilMessage;
  }
}
