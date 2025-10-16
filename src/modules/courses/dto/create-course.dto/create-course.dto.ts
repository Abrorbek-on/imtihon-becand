import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 1, description: 'Filial ID (branch_id)' })
  @IsInt()
  branch_id: number;

  @ApiProperty({ example: 2, description: 'Kurs kategoriyasi ID (category_id)' })
  @IsInt()
  category_id: number;

  @ApiProperty({ example: 'Frontend Bootcamp', description: 'Kurs nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'active', description: 'Kurs holati (status)' })
  @IsString()
  status: string;

  @ApiProperty({ example: 1200000, description: 'Kurs narxi (price)' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 120, required: false, description: 'Kurs soat davomiyligi (duration_hours)' })
  @IsOptional()
  @IsInt()
  duration_hours?: number;

  @ApiProperty({ example: 3, required: false, description: 'Kurs oy davomiyligi (duration_months)' })
  @IsOptional()
  @IsInt()
  duration_months?: number;

  @ApiProperty({ example: 'HTML, CSS, JS, React darslari', required: false, description: 'Kurs tavsifi (description)' })
  @IsOptional()
  @IsString()
  description?: string;
}
