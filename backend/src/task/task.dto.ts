import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  dueDate: string;


  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase())
  priority?: Priority
}