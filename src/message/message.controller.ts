import { Controller, Get } from '@nestjs/common';

@Controller('message')
export class MessageController {
  // constructor() {}

  @Get('test')
  testCron() {
    console.log('Cron is working');
  }
}
