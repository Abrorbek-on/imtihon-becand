import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@ApiTags('Centers')
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Post()
  @ApiOperation({ summary: 'Create new center' })
  create(@Body() dto: CreateCenterDto) {
    return this.centerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all centers' })
  findAll() {
    return this.centerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single center by ID' })
  findOne(@Param('id') id: string) {
    return this.centerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update center by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateCenterDto) {
    return this.centerService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete center by ID' })
  remove(@Param('id') id: string) {
    return this.centerService.remove(+id);
  }
}
