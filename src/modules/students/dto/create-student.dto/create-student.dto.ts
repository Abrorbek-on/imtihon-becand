import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export class CreateStudentDto {
    @ApiProperty({
        example: 'Abrorbek Karimov',
        description: 'Talabaning to‘liq ismi',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        example: 'abrorbek@example.com',
        description: 'Talabaning email manzili (unique bo‘lishi kerak)',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'StrongPass123!',
        description: 'Talaba tizimga kirish uchun parol',
    })
    @IsString()
    password: string;

    @ApiPropertyOptional({
        example: '+998901234567',
        description: 'Talabaning telefon raqami',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        enum: Gender,
        example: Gender.MALE,
        description: 'Talabaning jinsi',
    })
    @IsEnum(Gender)
    gender: Gender;

    @ApiPropertyOptional({
        example: 'https://cdn.site.com/student1.jpg',
        description: 'Talabaning rasmi (URL)',
    })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiPropertyOptional({
        example: '2002-06-15',
        description: 'Tug‘ilgan sana (YYYY-MM-DD formatida)',
    })
    @IsOptional()
    @IsDateString()
    birthday?: Date;

    @ApiPropertyOptional({
        example: 'active',
        description: 'Talabaning statusi',
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({
        example: { hobby: 'Football', telegram: '@abrorbek' },
        description: 'Qo‘shimcha ma’lumotlar (JSON formatda)',
    })
    @IsOptional()
    other_details?: any;

    @ApiProperty({
        example: 1,
        description: 'Talaba tegishli filial (branch) ID raqami',
    })
    @IsInt()
    branch_id: number;
}
