import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto/update-course-category.dto';

@Injectable()
export class CourseCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseCategoryDto) {
    return this.prisma.courseCategory.create({
      data,
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.courseCategory.findMany({
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.courseCategory.findUnique({
      where: { id },
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
    if (!category) throw new NotFoundException('Kurs kategoriyasi topilmadi');
    return category;
  }

  async update(id: number, data: UpdateCourseCategoryDto) {
    const exist = await this.prisma.courseCategory.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Kurs kategoriyasi topilmadi');

    return this.prisma.courseCategory.update({
      where: { id },
      data,
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
  }

  async remove(id: number) {
    const exist = await this.prisma.courseCategory.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Kurs kategoriyasi topilmadi');

    return this.prisma.courseCategory.delete({ where: { id } });
  }
}
