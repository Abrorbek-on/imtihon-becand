import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from '../create-group.dto/create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
