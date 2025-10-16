import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCourseCategoryDto {
  @ApiProperty({ example: 'Frontend Development', description: 'Kurs kategoriyasi nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Filial ID (branch_id)' })
  @IsInt()
  branch_id: number;
}
