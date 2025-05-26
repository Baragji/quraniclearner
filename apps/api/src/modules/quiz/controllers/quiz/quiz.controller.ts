import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { QuizService } from '../../services/quiz/quiz.service';
import { CreateQuizDto, UpdateQuizDto } from '../../dtos/quiz.dtos';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Quiz } from '@prisma/client';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Opret en ny quiz' })
  @ApiResponse({ status: 201, description: 'Quizzen er oprettet.', type: Quiz })
  @ApiResponse({ status: 400, description: 'Ugyldig input.' })
  @ApiBody({ type: CreateQuizDto })
  async create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Hent alle quizzer' })
  @ApiResponse({ status: 200, description: 'Liste over quizzer.', type: [Quiz] })
  async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hent en quiz ud fra ID' })
  @ApiResponse({ status: 200, description: 'Quiz fundet.', type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz ikke fundet.' })
  @ApiParam({ name: 'id', description: 'ID på quizzen', type: String })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    const quiz = await this.quizService.findOne(id);
    if (!quiz) {
      throw new NotFoundException(`Quiz med ID ${id} ikke fundet`);
    }
    return quiz;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Opdater en quiz ud fra ID' })
  @ApiResponse({ status: 200, description: 'Quizzen er opdateret.', type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz ikke fundet.' })
  @ApiResponse({ status: 400, description: 'Ugyldig input.' })
  @ApiParam({ name: 'id', description: 'ID på quizzen', type: String })
  @ApiBody({ type: UpdateQuizDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizService.update(id, updateQuizDto);
    if (!quiz) {
      throw new NotFoundException(`Quiz med ID ${id} ikke fundet`);
    }
    return quiz;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Slet en quiz ud fra ID' })
  @ApiResponse({ status: 200, description: 'Quizzen er slettet.', type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz ikke fundet.' })
  @ApiParam({ name: 'id', description: 'ID på quizzen', type: String })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    const quiz = await this.quizService.remove(id);
    if (!quiz) {
      throw new NotFoundException(`Quiz med ID ${id} ikke fundet`);
    }
    return quiz;
  }
}
