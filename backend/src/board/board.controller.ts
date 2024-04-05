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
import { BoardService } from './board.service';
import { BoardDto } from './board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAll() {
    return this.boardService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: BoardDto) {
    return this.boardService.create(dto)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.boardService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')

  async update(@Body() dto: BoardDto, @Param('id') id: string) {
    return this.boardService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.delete(id)
  }
}
