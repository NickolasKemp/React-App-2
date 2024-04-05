import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { TaskDto } from './task.dto';


@Injectable()
export class TaskService {
  constructor(private prisma: AppService) {
  }

  async getAll() {
    return this.prisma.task.findMany();
  }

  async create(dto: TaskDto) {
    return this.prisma.task.create({
      // @ts-ignore
      data: { ...dto },
    });
  }

  getById(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(dto: Partial<TaskDto>, taskId: string) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
