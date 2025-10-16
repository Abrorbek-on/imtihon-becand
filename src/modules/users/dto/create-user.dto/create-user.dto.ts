import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'Abrorbek Karimov', description: 'Foydalanuvchi ismi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'abrorbek@gmail.com', description: 'Foydalanuvchi emaili' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+998901234567', description: 'Telefon raqami' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '12345678', description: 'Parol' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'profile.jpg', description: 'Foydalanuvchi rasmi' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    example: 'ADMIN',
    enum: UserRole,
    description: 'Foydalanuvchi roli (ADMIN | MANAGER | STAFF)',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi tegishli filial IDsi' })
  @IsInt()
  branch_id: number;
}
