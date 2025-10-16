import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({ example: 'Main Education Center' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Tashkent', required: false })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({ example: 'Yakkasaroy district', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsOptional()
  @IsPhoneNumber('UZ')
  phone?: string;

  @ApiProperty({ example: 'info@center.uz', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}
