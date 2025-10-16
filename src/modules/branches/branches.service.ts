import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto/update-branch.dto';

@Injectable()
export class BranchesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateBranchDto) {
        return this.prisma.branch.create({
            data,
            include: {
                center: true,
            },
        });
    }

    async findAll() {
        return this.prisma.branch.findMany({
            include: {
                center: true,
            },
        });
    }

    async findOne(id: number) {
        const branch = await this.prisma.branch.findUnique({
            where: { id },
            include: {
                center: true,
            },
        });
        if (!branch) throw new NotFoundException('Filial topilmadi');
        return branch;
    }

    async update(id: number, data: UpdateBranchDto) {
        const exist = await this.prisma.branch.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Filial topilmadi');

        return this.prisma.branch.update({
            where: { id },
            data,
            include: {
                center: true,
            },
        });
    }

    async remove(id: number) {
        const exist = await this.prisma.branch.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Filial topilmadi');

        return this.prisma.branch.delete({
            where: { id },
            include: {
                center: true,
            },
        });
    }
}
