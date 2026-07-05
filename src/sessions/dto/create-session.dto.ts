import { IsNotEmpty, IsOptional, IsString, IsDateString, IsInt, Min } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;
}
