import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        branch: {
          include: { center: true },
        },
      },
    });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const exist = await this.prisma.user.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Foydalanuvchi topilmadi');

    return this.prisma.user.update({
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
    const exist = await this.prisma.user.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Foydalanuvchi topilmadi');

    return this.prisma.user.delete({ where: { id } });
  }
}
