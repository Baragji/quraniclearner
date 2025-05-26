import { Module } from '@nestjs/common';
import { LessonController } from './controllers/lesson/lesson.controller';
import { LessonService } from './services/lesson/lesson.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
