import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ListDto } from '../list/list.dto';
import { Type } from 'class-transformer';

export class BoardDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @ValidateNested({ each: true })
  @Type(() => ListDto)
  @IsOptional()
  lists?: ListDto[];

}