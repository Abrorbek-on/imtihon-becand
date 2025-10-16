import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateStudentGroupDto {
  @ApiProperty({
    example: 1,
    description: 'Guruh (Group) ID raqami',
  })
  @IsInt()
  group_id: number;

  @ApiProperty({
    example: '1',
    description: 'Talaba (Student) UUID IDsi',
  })
  @IsString()
  student_id: string;

  @ApiProperty({
    example: 1,
    description: 'Filial (Branch) ID raqami',
  })
  @IsInt()
  branch_id: number;
}
