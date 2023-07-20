import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Headers,
  Res,
  Get,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
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
  @Get('/info')
  @HttpCode(HttpStatus.OK)
  async getDetail(@Headers() hearder: any) {
    const id = await this.usersService.extractToken(hearder.authorization);
    return this.usersService.getDetail(id);
  }
}
