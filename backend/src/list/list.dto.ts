import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskDto } from '../task/task.dto';


export class ListDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  @IsOptional()
  tasks?: TaskDto[];
}