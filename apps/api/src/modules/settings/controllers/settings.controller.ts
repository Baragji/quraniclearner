import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SettingsService } from '../services/settings.service';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Opret nye brugerindstillinger' })
  @ApiResponse({ status: 201, description: 'Indstillingerne blev oprettet.' })
  @ApiResponse({ status: 400, description: 'Ugyldig anmodning.' })
  create(@Body() createSettingsDto: CreateSettingsDto) {
    return this.settingsService.create(createSettingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Hent alle brugerindstillinger' })
  @ApiResponse({ status: 200, description: 'Returnerer en liste af alle indstillinger.' })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hent specifikke brugerindstillinger via ID' })
  @ApiParam({ name: 'id', description: 'Indstillinger ID' })
  @ApiResponse({ status: 200, description: 'Returnerer de fundne indstillinger.' })
  @ApiResponse({ status: 404, description: 'Indstillinger blev ikke fundet.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.settingsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Hent brugerindstillinger via bruger-ID' })
  @ApiParam({ name: 'userId', description: 'Bruger ID' })
  @ApiResponse({ status: 200, description: 'Returnerer brugerens indstillinger.' })
  @ApiResponse({ status: 404, description: 'Ingen indstillinger fundet for brugeren.' })
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.settingsService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Opdater brugerindstillinger' })
  @ApiParam({ name: 'id', description: 'Indstillinger ID' })
  @ApiResponse({ status: 200, description: 'Indstillingerne blev opdateret.' })
  @ApiResponse({ status: 404, description: 'Indstillinger blev ikke fundet.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.settingsService.update(id, updateSettingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Slet brugerindstillinger' })
  @ApiParam({ name: 'id', description: 'Indstillinger ID' })
  @ApiResponse({ status: 200, description: 'Indstillingerne blev slettet.' })
  @ApiResponse({ status: 404, description: 'Indstillinger blev ikke fundet.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.settingsService.remove(id);
  }
}
