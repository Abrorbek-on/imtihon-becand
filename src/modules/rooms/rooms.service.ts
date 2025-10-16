import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateRoomDto) {
        return this.prisma.room.create({
            data,
            include: {
                branch: {
                    include: {
                        center: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.room.findMany({
            include: {
                branch: {
                    include: {
                        center: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: {
                branch: {
                    include: {
                        center: true,
                    },
                },
            },
        });

        if (!room) throw new NotFoundException('Xona topilmadi');
        return room;
    }

    async update(id: number, data: UpdateRoomDto) {
        const exist = await this.prisma.room.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Xona topilmadi');

        return this.prisma.room.update({
            where: { id },
            data,
            include: {
                branch: {
                    include: {
                        center: true,
                    },
                },
            },
        });
    }

    async remove(id: number) {
        const exist = await this.prisma.room.findUnique({ where: { id } });
        if (!exist) throw new NotFoundException('Xona topilmadi');

        return this.prisma.room.delete({
            where: { id },
            include: {
                branch: {
                    include: {
                        center: true,
                    },
                },
            },
        });
    }
}
