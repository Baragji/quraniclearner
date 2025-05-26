import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { VerseService } from '../../services/verse/verse.service';
import { CreateVerseDto } from '../../dtos/create-verse.dto';
import { UpdateVerseDto } from '../../dtos/update-verse.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Verses')
@Controller('verses')
export class VerseController {
  constructor(private readonly verseService: VerseService) {}

  @Post()
  @ApiOperation({ summary: 'Opret et nyt vers' })
  @ApiBody({ type: CreateVerseDto })
  @ApiResponse({ status: 201, description: 'Verset blev oprettet.' })
  create(@Body() createVerseDto: CreateVerseDto) {
    return this.verseService.create(createVerseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Hent alle vers' })
  @ApiResponse({ status: 200, description: 'Liste af vers.' })
  findAll() {
    return this.verseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hent et vers via id' })
  @ApiParam({ name: 'id', type: Number, description: 'Vers ID' })
  @ApiResponse({ status: 200, description: 'Et enkelt vers.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.verseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Opdater et vers via id' })
  @ApiParam({ name: 'id', type: Number, description: 'Vers ID' })
  @ApiBody({ type: UpdateVerseDto })
  @ApiResponse({ status: 200, description: 'Verset blev opdateret.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVerseDto: UpdateVerseDto) {
    return this.verseService.update(id, updateVerseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Slet et vers via id' })
  @ApiParam({ name: 'id', type: Number, description: 'Vers ID' })
  @ApiResponse({ status: 200, description: 'Verset blev slettet.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.verseService.remove(id);
  }
}
