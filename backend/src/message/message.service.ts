import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { MessageDto } from './message.dto';


@Injectable()
export class MessageService {
  constructor(private prisma: AppService) {
  }

  async getAll() {
    return this.prisma.message.findMany()
  }

  async create(dto: MessageDto) {
    return this.prisma.message.create({
      // @ts-ignore
      data: { ...dto },
    });
  }

  async getByBoardId(boardId: string) {
    return this.prisma.message.findMany({
      where: {
        boardId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.message.findUnique({
      where: {
        id,
      },
    });
  }

  async update(dto: Partial<MessageDto>, boardId: string) {
    return this.prisma.message.update({
      where: {
        id: boardId,
      },
      // @ts-ignore
      data: dto,
    });
  }

  async delete(boardId: string) {
    return this.prisma.message.delete({
      where: {
        id: boardId,
      },
    });
  }
}
