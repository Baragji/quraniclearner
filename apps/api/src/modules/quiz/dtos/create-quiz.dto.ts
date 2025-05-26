import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ description: 'Titlen på quizzen' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Beskrivelse af quizzen', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID på den lektion, quizzen tilhører' })
  @IsInt()
  @IsNotEmpty()
  lessonId: number;

  @ApiProperty({ description: 'ID på brugeren, der opretter quizzen' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Liste af spørgsmål-IDer inkluderet i quizzen', required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  questionIds?: number[];
}