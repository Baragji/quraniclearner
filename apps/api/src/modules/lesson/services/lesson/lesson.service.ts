import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLessonDto } from '../../dtos/create-lesson.dto/create-lesson.dto';
import { UpdateLessonDto } from '../../dtos/update-lesson.dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: createLessonDto,
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany();
  }

  async findOne(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: number) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
