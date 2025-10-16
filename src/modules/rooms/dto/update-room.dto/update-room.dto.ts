import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from '../create-room.dto/create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
