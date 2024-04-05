import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: TaskDto) {
    return this.taskService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')

  async update(@Body() dto: TaskDto, @Param('id') id: string) {
    return this.taskService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id)
  }
}
