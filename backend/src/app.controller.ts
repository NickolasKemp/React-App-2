import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Connect(): Promise<void> {
    return this.appService.onModuleInit();
  }

  getHello() {
    return 'Hello World!';
  }
}
