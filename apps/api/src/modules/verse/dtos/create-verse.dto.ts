import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVerseDto {
  @ApiProperty({ example: 1, description: 'Sura-nummeret' })
  @IsInt()
  surah: number;

  @ApiProperty({ example: 1, description: 'Ayah-nummeret' })
  @IsInt()
  ayah: number;

  @ApiProperty({ example: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', description: 'Teksten i verset' })
  @IsString()
  text: string;
}