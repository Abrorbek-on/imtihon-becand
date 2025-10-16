import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBranchDto } from './dto/create-branch.dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Post()
    @ApiOperation({ summary: 'Yangi filial yaratish' })
    @ApiResponse({ status: 201, description: 'Filial muvaffaqiyatli yaratildi' })
    create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchesService.create(createBranchDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha filiallarni olish' })
    @ApiResponse({ status: 200, description: 'Filiallar ro‘yxati' })
    findAll() {
        return this.branchesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Bitta filialni olish' })
    @ApiResponse({ status: 200, description: 'Topilgan filial ma’lumoti' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.branchesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Filialni yangilash' })
    @ApiResponse({ status: 200, description: 'Filial muvaffaqiyatli yangilandi' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBranchDto: UpdateBranchDto,
    ) {
        return this.branchesService.update(id, updateBranchDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Filialni o‘chirish' })
    @ApiResponse({ status: 200, description: 'Filial muvaffaqiyatli o‘chirildi' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.branchesService.remove(id);
    }
}
