import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateVerseDto } from '../../dtos/create-verse.dto';
import { UpdateVerseDto } from '../../dtos/update-verse.dto';

@Injectable()
export class VerseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateVerseDto) {
    return this.prisma.verse.create({ data });
  }

  async findAll() {
    return this.prisma.verse.findMany();
  }

  async findOne(id: number) {
    return this.prisma.verse.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateVerseDto) {
    return this.prisma.verse.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.verse.delete({ where: { id } });
  }
}
