import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { LessonService } from '../../services/lesson/lesson.service';
import { CreateLessonDto } from '../../dtos/create-lesson.dto/create-lesson.dto';
import { UpdateLessonDto } from '../../dtos/update-lesson.dto/update-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Opret en ny lektion' })
  @ApiResponse({ status: 201, description: 'Lektionen er oprettet.' })
  @ApiResponse({ status: 400, description: 'Ugyldig input.' })
  @ApiBody({ type: CreateLessonDto })
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Hent alle lektioner' })
  @ApiResponse({ status: 200, description: 'Liste over lektioner.' })
  async findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hent en lektion ud fra ID' })
  @ApiResponse({ status: 200, description: 'Lektion fundet.' })
  @ApiResponse({ status: 404, description: 'Lektion ikke fundet.' })
  @ApiParam({ name: 'id', description: 'ID på lektionen', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const lesson = await this.lessonService.findOne(id);
    if (!lesson) {
      throw new NotFoundException(`Lektion med ID ${id} ikke fundet`);
    }
    return lesson;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Opdater en lektion ud fra ID' })
  @ApiResponse({ status: 200, description: 'Lektionen er opdateret.' })
  @ApiResponse({ status: 400, description: 'Ugyldig input.' })
  @ApiResponse({ status: 404, description: 'Lektion ikke fundet.' })
  @ApiParam({ name: 'id', description: 'ID på lektionen', type: Number })
  @ApiBody({ type: UpdateLessonDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonService.update(id, updateLessonDto);
    if (!lesson) {
      throw new NotFoundException(`Lektion med ID ${id} ikke fundet`);
    }
    return lesson;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Slet en lektion ud fra ID' })
  @ApiResponse({ status: 200, description: 'Lektionen er slettet.' })
  @ApiResponse({ status: 404, description: 'Lektion ikke fundet.' })
  @ApiParam({ name: 'id', description: 'ID på lektionen', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const lesson = await this.lessonService.remove(id);
    if (!lesson) {
      throw new NotFoundException(`Lektion med ID ${id} ikke fundet`);
    }
    return lesson;
  }
}
