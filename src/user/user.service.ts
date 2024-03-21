import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { name, email, password, profilePicture } = data;
    return this.prisma.user.create({
      data: {
        name,
        email,
        password, // Certifique-se de que a senha seja criptografada antes de salvar
        profilePicture,
      },
    });
  }
}
