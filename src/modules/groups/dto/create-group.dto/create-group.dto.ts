import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'Frontend Guruh A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  branch_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  course_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  room_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  teacher_id: number;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  status: string;

  @ApiProperty({ example: ['Dushanba', 'Chorshanba', 'Juma'] })
  @IsArray()
  days: string[];

  @ApiProperty({ example: '2025-10-10T10:00:00.000Z' })
  @IsDateString()
  start_time: Date;

  @ApiProperty({ example: '2025-10-12T00:00:00.000Z' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '2026-03-12T00:00:00.000Z' })
  @IsDateString()
  end_date: Date;
}
