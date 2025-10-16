import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto/update-teacher.dto';


@Injectable()
export class TeachersService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateTeacherDto) {
        const branch = await this.prisma.branch.findUnique({
            where: { id: data.branch_id },
        });
        if (!branch) throw new NotFoundException('Bunday filial mavjud emas');
        

        return this.prisma.teacher.create({
            data: {
                ...data,
                birthday: data.birthday ? new Date(data.birthday) : undefined,
            },
            include: {
                branch: { include: { center: true } },
                groups: true,
            },
        });
    }


    async findAll() {
        return this.prisma.teacher.findMany({
            include: {
                branch: {
                    include: { center: true },
                },
                groups: true,
            },
        });
    }

    async findOne(id: number) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { id },
            include: {
                branch: {
                    include: { center: true },
                },
                groups: true,
            },
        });

        if (!teacher) throw new NotFoundException('Ustoz topilmadi');
        return teacher;
    }

    async update(id: number, data: UpdateTeacherDto) {
        const exist = await this.prisma.teacher.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Ustoz topilmadi');

        return this.prisma.teacher.update({
            where: { id },
            data,
            include: {
                branch: {
                    include: { center: true },
                },
                groups: true,
            },
        });
    }

    async remove(id: number) {
        const exist = await this.prisma.teacher.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Ustoz topilmadi');

        return this.prisma.teacher.delete({ where: { id } });
    }
}
