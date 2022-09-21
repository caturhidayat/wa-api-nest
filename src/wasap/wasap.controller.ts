import { Controller, Get, Header } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';
import { WasapService } from './wasap.service';

@Controller('wasap')
export class WasapController {
  constructor(
    private wasapService: WasapService,
    private utilService: UtilService,
  ) {}
  @Get()
  @Header(
    'Authorization',
    'Bearer v8,d/<dzoa{@q/nce.jAG,5OOMECGDz>96NPLa{c=95W1@6D-catur',
  )
  @Header('Content-Type', 'application/json')
  sendWasap() {
    return this.wasapService.sendWasap();
  }

  @Get('/users')
  getWasap() {
    return this.utilService.compareDate();
  }
}
