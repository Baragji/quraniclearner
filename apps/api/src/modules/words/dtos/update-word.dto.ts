import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateWordDto {
  @IsOptional()
  @IsString()
  arabic?: string;

  @IsOptional()
  @IsString()
  root?: string;

  @IsOptional()
  @IsString()
  meaning?: string;

  @IsOptional()
  @IsInt()
  verseId?: number;
}