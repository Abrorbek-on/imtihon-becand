import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentGroupDto } from './dto/create-student-group.dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto/update-student-group.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StudentGroupService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateStudentGroupDto) {
        const { group_id, student_id, branch_id } = dto;

        const [group, student, branch] = await Promise.all([
            this.prisma.group.findUnique({ where: { id: group_id } }),
            this.prisma.student.findUnique({ where: { id: student_id } }),
            this.prisma.branch.findUnique({ where: { id: branch_id } }),
        ]);

        if (!group) throw new NotFoundException('Bunday guruh topilmadi');
        if (!student) throw new NotFoundException('Bunday talaba topilmadi');
        if (!branch) throw new NotFoundException('Bunday filial topilmadi');

        return this.prisma.studentGroup.create({
            data: dto,
            include: {
                group: {
                    include: {  
                        course: true,
                        teacher: true,
                        branch: { include: { center: true } },
                    },
                },
                student: {
                    include: {
                        branch: { include: { center: true } },
                    },
                },
                branch: {
                    include: { center: true },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.studentGroup.findMany({
            include: {
                group: {
                    include: {
                        course: true,
                        teacher: true,
                        branch: { include: { center: true } },
                    },
                },
                student: {
                    include: {
                        branch: { include: { center: true } },
                    },
                },
                branch: {
                    include: { center: true },
                },
            },
        });
    }

    async findOne(id: number) {
        const studentGroup = await this.prisma.studentGroup.findUnique({
            where: { id },
            include: {
                group: {
                    include: {
                        course: true,
                        teacher: true,
                        branch: { include: { center: true } },
                    },
                },
                student: {
                    include: {
                        branch: { include: { center: true } },
                    },
                },
                branch: {
                    include: { center: true },
                },
            },
        });

        if (!studentGroup) throw new NotFoundException('StudentGroup topilmadi');
        return studentGroup;
    }

    async update(id: number, dto: UpdateStudentGroupDto) {
        const exist = await this.prisma.studentGroup.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('StudentGroup topilmadi');

        return this.prisma.studentGroup.update({
            where: { id },
            data: dto,
            include: {
                group: {
                    include: {
                        course: true,
                        teacher: true,
                        branch: { include: { center: true } },
                    },
                },
                student: {
                    include: {
                        branch: { include: { center: true } },
                    },
                },
                branch: {
                    include: { center: true },
                },
            },
        });
    }

    async remove(id: number) {
        const exist = await this.prisma.studentGroup.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('StudentGroup topilmadi');

        return this.prisma.studentGroup.delete({ where: { id } });
    }
}
