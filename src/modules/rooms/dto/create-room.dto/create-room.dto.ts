import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: '1', description: 'Filial ID' })
  @IsInt()
  branch_id: number;

  @ApiProperty({ example: 'Xona A-101', description: 'Xona nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 25, description: 'Sig‘imi (necha o‘rindiq)' })
  @IsInt()
  capacity: number;
}
