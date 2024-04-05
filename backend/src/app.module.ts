import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [TaskModule, ListModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
