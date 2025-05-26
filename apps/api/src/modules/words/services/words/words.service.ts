import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateWordDto } from '../../dtos/create-word.dto';
import { UpdateWordDto } from '../../dtos/update-word.dto';

@Injectable()
export class WordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWordDto) {
    return this.prisma.word.create({ data });
  }

  async findAll() {
    return this.prisma.word.findMany();
  }

  async findOne(id: number) {
    return this.prisma.word.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateWordDto) {
    return this.prisma.word.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.word.delete({ where: { id } });
  }
}
