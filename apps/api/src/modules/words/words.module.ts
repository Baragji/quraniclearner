import { Module } from '@nestjs/common';
import { WordsController } from './controllers/words/words.controller';
import { WordsService } from './services/words/words.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WordsController],
  providers: [WordsService]
})
export class WordsModule {}
