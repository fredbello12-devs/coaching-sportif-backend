import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Fred Diop' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fred@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test123!' })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;
}
