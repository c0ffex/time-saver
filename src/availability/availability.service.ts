import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAvailability } from './interfaces/availability-interface';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAvailabilityDto) {
    return await this.prisma.availability.create({
      data,
    });
  }

  findAll() {
    return `This action returns all availability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  async updateAll(data: UpdateAvailabilityDto, from: IService ||  ) {
    await this.prisma.availability.updateMany({
      where: {
        serviceId: from.id,
        userAvailabilityId: id,
      },
      data,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} availability`;
  // }
}
