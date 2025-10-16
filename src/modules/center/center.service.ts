import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CenterService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCenterDto) {
    return this.prisma.center.create({ data: dto });
  }

  async findAll() {
    return this.prisma.center.findMany({
      include: { branches: true },
    });
  }

  async findOne(id: number) {
    const center = await this.prisma.center.findUnique({
      where: { id },
      include: { branches: true },
    });
    if (!center) throw new NotFoundException('Center not found');
    return center;
  }

  async update(id: number, dto: UpdateCenterDto) {
    return this.prisma.center.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.center.delete({ where: { id } });
  }
}
