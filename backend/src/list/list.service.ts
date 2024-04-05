import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { ListDto } from './list.dto';


@Injectable()
export class ListService {
  constructor(private prisma: AppService) {
  }

  async getAll() {
    return this.prisma.list.findMany();
  }

  async create(dto: ListDto) {
    return this.prisma.list.create({
      // @ts-ignore
      data: { ...dto },
    });
  }

  getById(id: string) {
    return this.prisma.list.findUnique({
      where: {
        id,
      },
    });
  }

  async getByBoardId(boardId: string) {
    return this.prisma.list.findMany({
      where: {
        boardId,
      },
    });
  }

  async update(dto: Partial<ListDto>, listId: string) {
    return this.prisma.list.update({
      where: {
        id: listId,
      },
      // @ts-ignore
      data: dto,
    });
  }

  async delete(listId: string) {
    return this.prisma.list.delete({
      where: {
        id: listId,
      },
    });
  }
}
