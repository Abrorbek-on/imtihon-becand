import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentGroupService } from './student-groups.service';
import { CreateStudentGroupDto } from './dto/create-student-group.dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto/update-student-group.dto';


@ApiTags('Student Groups')
@Controller('student-groups')
export class StudentGroupController {
  constructor(private readonly studentGroupService: StudentGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi student-group yaratish' })
  @ApiResponse({ status: 201, description: 'StudentGroup muvaffaqiyatli yaratildi' })
  create(@Body() dto: CreateStudentGroupDto) {
    return this.studentGroupService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha student-grouplarni olish' })
  findAll() {
    return this.studentGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta student-groupni olish' })
  findOne(@Param('id') id: string) {
    return this.studentGroupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Student-groupni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateStudentGroupDto) {
    return this.studentGroupService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Student-groupni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.studentGroupService.remove(+id);
  }
}
