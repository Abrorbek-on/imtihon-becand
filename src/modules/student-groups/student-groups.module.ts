import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { StudentGroupService } from './student-groups.service';
import { StudentGroupController } from './student-groups.controller';

@Module({
  imports: [PrismaModule],
  providers: [StudentGroupService],
  controllers: [StudentGroupController]
})
export class StudentGroupsModule { }
