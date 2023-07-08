import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('list')
  findAll() {
    // return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
