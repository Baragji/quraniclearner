import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsNotEmpty } from 'class-validator';

export class CreateSettingsDto {
  @ApiProperty({
    description: 'Bruger ID som indstillingerne tilhører',
    example: 1
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Brugerens præferencer som et JSON-objekt',
    example: {
      theme: 'dark',
      language: 'da',
      notifications: true
    }
  })
  @IsObject()
  @IsNotEmpty()
  preferences: Record<string, any>;
}