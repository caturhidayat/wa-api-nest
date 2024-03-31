import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class CronService {
  constructor(private messageService: MessageService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  cronSendMessageBirthday() {
    this.messageService.birthdayUser();
  }
}
