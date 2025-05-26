import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz/quiz.controller';
import { QuizService } from './services/quiz/quiz.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
