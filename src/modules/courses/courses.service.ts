import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCourseDto) {
        if (!data.branch_id) {
            throw new BadRequestException('branch_id majburiy');
        }

        if (!data.category_id) {
            throw new BadRequestException('category_id majburiy');
        }

        const branch = await this.prisma.branch.findUnique({
            where: { id: data.branch_id },
        });
        if (!branch) throw new BadRequestException('Bunday filial mavjud emas');

        const category = await this.prisma.courseCategory.findUnique({
            where: { id: data.category_id },
        });
        if (!category) throw new BadRequestException('Bunday kategoriya mavjud emas');

        return this.prisma.course.create({
            data,
            include: {
                branch: { include: { center: true } },
                category: true,
            },
        });
    }


    async findAll() {
        return this.prisma.course.findMany({
            include: {
                branch: {
                    include: { center: true },
                },
                category: true,
            },
        });
    }

    async findOne(id: number) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                branch: {
                    include: { center: true },
                },
                category: true,
            },
        });

        if (!course) throw new NotFoundException('Kurs topilmadi');
        return course;
    }
    async update(id: number, data: UpdateCourseDto) {
        const exist = await this.prisma.course.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Kurs topilmadi');

        const updateData: any = { ...data };

        if (data.branch_id) {
            const branch = await this.prisma.branch.findUnique({ where: { id: data.branch_id } });
            if (!branch) throw new BadRequestException('Bunday filial mavjud emas');
            updateData.branch = { connect: { id: data.branch_id } };
            delete updateData.branch_id;
        }

        if (data.category_id) {
            const category = await this.prisma.courseCategory.findUnique({ where: { id: data.category_id } });
            if (!category) throw new BadRequestException('Bunday kategoriya mavjud emas');
            updateData.category = { connect: { id: data.category_id } };
            delete updateData.category_id;
        }

        return this.prisma.course.update({
            where: { id },
            data: updateData,
            include: {
                branch: { include: { center: true } },
                category: true,
            },
        });
    }



    async remove(id: number) {
        const exist = await this.prisma.course.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Kurs topilmadi');

        return this.prisma.course.delete({ where: { id } });
    }
}
