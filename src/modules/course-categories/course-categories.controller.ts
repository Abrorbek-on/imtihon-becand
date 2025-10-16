import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CourseCategoriesService } from './course-categories.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto/update-course-category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Course Categories')
@Controller('course-categories')
export class CourseCategoriesController {
  constructor(private readonly courseCategoriesService: CourseCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kurs kategoriyasi yaratish' })
  @ApiResponse({ status: 201, description: 'Kurs kategoriyasi yaratildi' })
  create(@Body() dto: CreateCourseCategoryDto) {
    return this.courseCategoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kurs kategoriyalarini olish' })
  findAll() {
    return this.courseCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta kurs kategoriyasini olish' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseCategoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Kurs kategoriyasini yangilash' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseCategoryDto) {
    return this.courseCategoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kurs kategoriyasini o‘chirish' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseCategoriesService.remove(id);
  }
}
