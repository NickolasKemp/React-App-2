import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAll() {
    return this.messageService.getAll();
  }

  @Get('board/:boardId')
  async getByBoardId(@Param('boardId') boardId: string) {
    return this.messageService.getByBoardId(boardId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: MessageDto) {
    return this.messageService.create(dto)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.messageService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')

  async update(@Body() dto: MessageDto, @Param('id') id: string) {
    return this.messageService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.messageService.delete(id)
  }
}
