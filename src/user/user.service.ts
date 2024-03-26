import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthEntity } from './entity/user.entity';
import { AuthHelper } from './user-helpers/auth.helper';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
  ) {}

  async login(data: LoginUserDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${data.email}`);
    }

    const isUserValid = await this.authHelper.isUserValid(user, data.password);

    if (!isUserValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user,
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await this.authHelper.hashPassword(data.password);

    data.password = hashedPassword;
    data.emailToken = randomUUID();
    data.emailConfirmed = true;
    return this.prisma.user.create({
      data,
    });
  }

  async findOneById(id: number): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`No user found for id: ${id}`);
    }
    return user;
  }

  async confirmEmail(emailToken: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: { emailToken },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true,
        emailToken: null,
      },
    });

    return updatedUser;
  }
}
