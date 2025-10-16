import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto/update-group.dto';

@Injectable()
export class GroupsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateGroupDto) {
        const { branch_id, course_id, room_id, teacher_id, ...rest } = data;

        const [branch, course, room, teacher] = await Promise.all([
            this.prisma.branch.findUnique({ where: { id: branch_id } }),
            this.prisma.course.findUnique({ where: { id: course_id } }),
            this.prisma.room.findUnique({ where: { id: room_id } }),
            this.prisma.teacher.findUnique({ where: { id: teacher_id } }),
        ]);

        if (!branch) throw new BadRequestException('Bunday filial mavjud emas');
        if (!course) throw new BadRequestException('Bunday kurs mavjud emas');
        if (!room) throw new BadRequestException('Bunday xona mavjud emas');
        if (!teacher) throw new BadRequestException('Bunday o‘qituvchi mavjud emas');

        return this.prisma.group.create({
            data: {
                ...rest,
                branch: { connect: { id: branch_id } },
                course: { connect: { id: course_id } },
                room: { connect: { id: room_id } },
                teacher: { connect: { id: teacher_id } },
            },
            include: {
                branch: { include: { center: true } },
                course: { include: { category: true } },
                room: true,
                teacher: true,
            },
        });
    }


    async findAll() {
        return this.prisma.group.findMany({
            include: {
                branch: { include: { center: true } },
                course: { include: { category: true } },
                room: true,
                teacher: true,
            },
        });
    }

    async findOne(id: number) {
        const group = await this.prisma.group.findUnique({
            where: { id },
            include: {
                branch: { include: { center: true } },
                course: { include: { category: true } },
                room: true,
                teacher: true,
            },
        });

        if (!group) throw new NotFoundException('Guruh topilmadi');
        return group;
    }

    async update(id: number, data: UpdateGroupDto) {
        const exist = await this.prisma.group.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Guruh topilmadi');

        const { branch_id, course_id, room_id, teacher_id } = data;

        if (branch_id) {
            const branch = await this.prisma.branch.findUnique({ where: { id: branch_id } });
            if (!branch) throw new BadRequestException('Bunday filial mavjud emas');
        }
        if (course_id) {
            const course = await this.prisma.course.findUnique({ where: { id: course_id } });
            if (!course) throw new BadRequestException('Bunday kurs mavjud emas');
        }
        if (room_id) {
            const room = await this.prisma.room.findUnique({ where: { id: room_id } });
            if (!room) throw new BadRequestException('Bunday xona mavjud emas');
        }
        if (teacher_id) {
            const teacher = await this.prisma.teacher.findUnique({ where: { id: teacher_id } });
            if (!teacher) throw new BadRequestException('Bunday o‘qituvchi mavjud emas');
        }

        return this.prisma.group.update({
            where: { id },
            data,
            include: {
                branch: { include: { center: true } },
                course: { include: { category: true } },
                room: true,
                teacher: true,
            },
        });
    }

    async remove(id: number) {
        const exist = await this.prisma.group.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Guruh topilmadi');

        return this.prisma.group.delete({ where: { id } });
    }
}
