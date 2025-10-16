import { PartialType } from '@nestjs/swagger';
import { CreateStudentGroupDto } from '../create-student-group.dto/create-student-group.dto';

export class UpdateStudentGroupDto extends PartialType(CreateStudentGroupDto) {}
