import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateQuizDto } from '../dtos/create-quiz.dto';
import { UpdateQuizDto } from '../dtos/update-quiz.dto';
import { Quiz } from '@prisma/client';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.prisma.quiz.create({ data: createQuizDto });
  }

  async findAll(): Promise<Quiz[]> {
    return this.prisma.quiz.findMany();
  }

  async findOne(id: number): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({ where: { id } });
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz | null> {
    return this.prisma.quiz.update({ where: { id }, data: updateQuizDto });
  }

  async remove(id: number): Promise<Quiz | null> {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
