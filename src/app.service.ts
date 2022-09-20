import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    console.log(this.configService.get<string>('WA_API_TOKEN'));
    return 'Hello NestJS!';
  }
}
