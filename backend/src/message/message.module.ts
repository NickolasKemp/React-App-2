import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AppService } from '../app.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, AppService],
  exports: [MessageService]
})
export class MessageModule {}
