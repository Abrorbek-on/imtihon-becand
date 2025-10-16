import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BranchStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateBranchDto {
    @ApiProperty({ example: 'Tashkent Central Branch', description: 'Filial nomi' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'Toshkent viloyati', description: 'Region nomi' })
    @IsOptional()
    @IsString()
    region?: string;

    @ApiPropertyOptional({ example: 'Yakkasaroy tumani', description: 'Tuman nomi' })
    @IsOptional()
    @IsString()
    district?: string;

    @ApiPropertyOptional({ example: 'Bobur ko‘chasi, 25-uy', description: 'Manzil' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ example: '+998901234567', description: 'Telefon raqami' })
    @IsOptional()
    @IsPhoneNumber('UZ')
    phone?: string;

    @ApiProperty({
        example: 'ACTIVE',
        enum: BranchStatus,
        description: 'Filial holati (ACTIVE | INACTIVE)',
    })
    @IsEnum(BranchStatus)
    status: BranchStatus;

    @ApiPropertyOptional({ example: 1, description: 'Markaz ID (center_id)' })
    @IsOptional()
    @IsInt()
    center_id?: number;
}
