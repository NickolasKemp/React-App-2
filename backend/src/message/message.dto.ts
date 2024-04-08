import { IsOptional, IsString} from 'class-validator';

export class MessageDto {
  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  boardId: string;

  @IsString()
  @IsOptional()
  taskId: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

}