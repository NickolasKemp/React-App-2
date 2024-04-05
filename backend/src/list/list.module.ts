import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { AppService } from '../app.service';

@Module({
  controllers: [ListController],
  providers: [ListService, AppService],
  exports: [ListService]
})
export class ListModule {}
