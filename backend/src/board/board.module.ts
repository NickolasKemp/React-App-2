import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AppService } from '../app.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, AppService],
  exports: [BoardService]
})
export class BoardModule {}
