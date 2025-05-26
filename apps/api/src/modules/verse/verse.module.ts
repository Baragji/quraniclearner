import { Module } from '@nestjs/common';
import { VerseController } from './controllers/verse/verse.controller';
import { VerseService } from './services/verse/verse.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VerseController],
  providers: [VerseService]
})
export class VerseModule {}
