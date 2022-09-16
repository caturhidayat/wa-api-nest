import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { timeout } from 'rxjs';
import { WasapController } from './wasap.controller';
import { WasapService } from './wasap.service';

@Module({
    imports: [HttpModule.registerAsync({
        useFactory: () => ({
            maxRedirects: 5,
            headers: { 'Authorization': 'Bearer v8,d/<dzoa{@q/nce.jAG,5OOMECGDz>96NPLa{c=95W1@6D-catur' },
            Headers: { 'Content-Type': 'application/json' },
        }),
    })],
    controllers: [WasapController],
    providers: [WasapService],
})
export class WasapModule { }
