import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Certifique-se de exportar o PrismaService para que ele possa ser injetado em outros módulos
})
export class PrismaModule {}