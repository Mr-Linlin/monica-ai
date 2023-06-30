import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test, TestQuery } from './interfaces/test.interfaces';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) { }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  @Post('add')
  async create(@Body() testModel: Test, @Res() res: any) {
    const data = await this.testService.addTest(testModel);
    res.status(HttpStatus.CREATED).send(data);
  }
  @Get()
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }
  @Get('getTest')
  async findList(@Query() query: TestQuery, @Res() res: any) {
    const data = await this.testService.getTest(query);
    res.status(HttpStatus.CREATED).send(data);
  }
}
