import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const data = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.OK).send(data);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const data = await this.usersService.login(createUserDto);
    return res.status(HttpStatus.OK).send(data);
  }
}
