import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
