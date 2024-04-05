import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { BoardDto } from './board.dto';


@Injectable()
export class BoardService {
  constructor(private prisma: AppService) {
  }

  async getAll() {
    return this.prisma.board.findMany();
  }

  async create(dto: BoardDto) {
    return this.prisma.board.create({
      // @ts-ignore
      data: { ...dto },
    });
  }

  getById(id: string) {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }

  async update(dto: Partial<BoardDto>, boardId: string) {
    return this.prisma.board.update({
      where: {
        id: boardId,
      },
      // @ts-ignore
      data: dto,
    });
  }

  async delete(boardId: string) {
    return this.prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  }
}
