import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsEnum, IsInt, IsDateString } from 'class-validator';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export class CreateTeacherDto {
    @ApiProperty({
        example: 'Abrorbek Karimov',
        description: 'Ustozning to‘liq ismi',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        enum: Gender,
        example: Gender.MALE,
        description: 'Ustoz jinsi (MALE yoki FEMALE)',
    })
    @IsEnum(Gender)
    gender: Gender;

    @ApiPropertyOptional({
        example: 'abror@example.com',
        description: 'Ustoz email manzili (ixtiyoriy)',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        example: '+998901234567',
        description: 'Telefon raqami (ixtiyoriy)',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        example: 'https://cdn.site.com/teacher1.jpg',
        description: 'Ustoz rasmi URL (ixtiyoriy)',
    })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiPropertyOptional({
        example: '1998-03-25',
        description: 'Tug‘ilgan sana (ixtiyoriy)',
    })
    @ApiPropertyOptional({ example: '1998-03-25' })
    @IsOptional()
    @IsString()
    birthday?: string;


    @ApiProperty({
        example: 'securePassword123',
        description: 'Ustoz paroli',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: 3,
        description: 'Ustoz ishlayotgan filial (branch) ID raqami',
    })
    @IsInt()
    branch_id: number;

    @ApiPropertyOptional({
        example: 50,
        description: 'Ustozning tangalari (ixtiyoriy)',
    })
    @IsOptional()
    @IsInt()
    coin?: number;

    @ApiPropertyOptional({
        example: 'active',
        description: 'Ustozning holati (ixtiyoriy)',
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({
        example: 'Matematika bo‘yicha yetakchi ustoz',
        description: 'Ustoz haqida qo‘shimcha ma’lumot (ixtiyoriy)',
    })
    @IsOptional()
    @IsString()
    description?: string;
}
