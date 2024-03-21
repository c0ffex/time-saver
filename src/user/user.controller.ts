import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service'; // Ajuste o caminho conforme necessário
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }
}
