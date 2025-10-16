import { Module } from '@nestjs/common';
import { BranchesModule } from './modules/branches/branches.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { CourseCategoriesModule } from './modules/course-categories/course-categories.module';
import { CoursesModule } from './modules/courses/courses.module';
import { GroupsModule } from './modules/groups/groups.module';
import { StudentsModule } from './modules/students/students.module';
import { StudentGroupsModule } from './modules/student-groups/student-groups.module';
import { CenterModule } from './modules/center/center.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [BranchesModule, RoomsModule, UsersModule, CourseCategoriesModule, CoursesModule, GroupsModule, StudentsModule, StudentGroupsModule, TeachersModule, CenterModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
