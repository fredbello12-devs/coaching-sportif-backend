import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ example: 'Séance HIIT' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Session de haute intensité', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-07-05T10:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: 60, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;
}
