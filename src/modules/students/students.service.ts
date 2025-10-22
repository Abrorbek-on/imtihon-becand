import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateStudentDto) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: data.branch_id },
    });
    if (!branch) throw new BadRequestException('Bunday filial mavjud emas');

    return this.prisma.student.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
        photo: data.photo,
        birthday: data.birthday ? new Date(data.birthday) : null,
        status: data.status ?? 'active',
        other_details: data.other_details ?? {},
        branch_id: data.branch_id,
      },
      include: {
        branch: { include: { center: true } },
        studentGroups: true,
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        branch: { include: { center: true } },
        studentGroups: true,
      },
    });
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        branch: { include: { center: true } },
        studentGroups: true,
      },
    });
    if (!student) throw new NotFoundException('Talaba topilmadi');
    return student;
  }

  async update(id: string, data: UpdateStudentDto) {
    console.log("UPDATE student:", id, data);
    try {
      const exist = await this.prisma.student.findUnique({ where: { id } });
      if (!exist) throw new NotFoundException('Talaba topilmadi');

      const updated = await this.prisma.student.update({
        where: { id },
        data: {
          ...data,
          birthday: data.birthday ? new Date(data.birthday) : undefined,
        },
      });
      return updated;
    } catch (err) {
      console.error("Update xatolik:", err);
      throw err;
    }
  }


  async remove(id: string) {
    const exist = await this.prisma.student.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Talaba topilmadi');

    return this.prisma.student.delete({ where: { id } });
  }
}
