import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthEntity } from './entity/user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('confirm-email/:token')
  @ApiOkResponse({ description: 'confirmed email' })
  async confirmEmail(@Param('token') emailToken: string) {
    return this.userService.confirmEmail(emailToken);
  }
}
