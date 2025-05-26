import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { WordsModule } from './modules/words/words.module';
import { VerseModule } from './modules/verse/verse.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [PrismaModule, WordsModule, VerseModule, LessonModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
