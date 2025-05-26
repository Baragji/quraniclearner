import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SettingsService } from './services/settings/settings.service';
import { SettingsController } from './controllers/settings/settings.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}