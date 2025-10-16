import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from '../create-teacher.dto/create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
