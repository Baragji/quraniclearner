import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { WordsService } from '../../services/words/words.service';
import { CreateWordDto } from '../../dtos/create-word.dto';
import { UpdateWordDto } from '../../dtos/update-word.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  @ApiOperation({ summary: 'Opret et nyt ord' })
  @ApiBody({ type: CreateWordDto })
  @ApiResponse({ status: 201, description: 'Ordet blev oprettet.' })
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  @ApiOperation({ summary: 'Hent alle ord' })
  @ApiResponse({ status: 200, description: 'Liste af ord.' })
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hent et ord via id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Et enkelt ord.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Opdater et ord via id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateWordDto })
  @ApiResponse({ status: 200, description: 'Ordet blev opdateret.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(id, updateWordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Slet et ord via id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Ordet blev slettet.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.remove(id);
  }
}
