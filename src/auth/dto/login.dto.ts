import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@local' })
  @IsEmail({ require_tld: false })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin123!' })
  @IsNotEmpty()
  password: string;
}
