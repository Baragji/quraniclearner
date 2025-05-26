import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVerseDto {
  @ApiPropertyOptional({ example: 1, description: 'Sura-nummeret' })
  @IsOptional()
  @IsInt()
  surah?: number;

  @ApiPropertyOptional({ example: 1, description: 'Ayah-nummeret' })
  @IsOptional()
  @IsInt()
  ayah?: number;

  @ApiPropertyOptional({ example: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', description: 'Teksten i verset' })
  @IsOptional()
  @IsString()
  text?: string;
}