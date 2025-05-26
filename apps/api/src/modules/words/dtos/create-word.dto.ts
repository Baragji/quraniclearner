import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateWordDto {
  @IsString()
  arabic: string;

  @IsOptional()
  @IsString()
  root?: string;

  @IsString()
  meaning: string;

  @IsOptional()
  @IsInt()
  verseId?: number;
}