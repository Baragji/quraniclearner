import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSettingsDto } from '../../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../../dtos/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSettingsDto: CreateSettingsDto) {
    return this.prisma.settings.create({
      data: createSettingsDto,
    });
  }

  async findAll() {
    return this.prisma.settings.findMany();
  }

  async findOne(id: number) {
    const settings = await this.prisma.settings.findUnique({
      where: { id },
    });

    if (!settings) {
      throw new NotFoundException(`Indstillinger med ID ${id} blev ikke fundet`);
    }

    return settings;
  }

  async findByUserId(userId: number) {
    const settings = await this.prisma.settings.findUnique({
      where: { userId },
    });

    if (!settings) {
      throw new NotFoundException(`Indstillinger for bruger ${userId} blev ikke fundet`);
    }

    return settings;
  }

  async update(id: number, updateSettingsDto: UpdateSettingsDto) {
    const settings = await this.prisma.settings.findUnique({
      where: { id },
    });

    if (!settings) {
      throw new NotFoundException(`Indstillinger med ID ${id} blev ikke fundet`);
    }

    return this.prisma.settings.update({
      where: { id },
      data: updateSettingsDto,
    });
  }

  async remove(id: number) {
    const settings = await this.prisma.settings.findUnique({
      where: { id },
    });

    if (!settings) {
      throw new NotFoundException(`Indstillinger med ID ${id} blev ikke fundet`);
    }

    return this.prisma.settings.delete({
      where: { id },
    });
  }
}
