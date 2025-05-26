import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({
    description: 'Brugerens opdaterede præferencer som et JSON-objekt',
    example: {
      theme: 'light',
      language: 'en',
      notifications: false
    }
  })
  @IsObject()
  @IsOptional()
  preferences?: Record<string, any>;
}