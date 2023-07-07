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
    messages: [
      {
        role: 'system',
        content: '你好，我是一个智能AI，你可以向我问些问题。',
      },
      {
        role: 'user',
        content: '写一个50字的关于母亲的作文',
      },
    ],
      temperature: 1.2,
        max_tokens: 200,
  })
  // return this.usersService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id);
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
