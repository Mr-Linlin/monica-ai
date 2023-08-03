import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { CommonService } from '../common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Controller('role')
export class RoleController {
  constructor(
    private commonService: CommonService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('add')
  async add(@Body() body: CreateRoleDto) {
    const where = {
      role_name: body.role_name,
    };
    return this.commonService.addModel<CreateRoleDto>(
      this.roleRepository,
      body,
      where,
    );
  }
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: any) {
    return this.commonService.findModelAll(this.roleRepository, query);
  }
  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() query: CreateRoleDto) {
    return this.commonService.editModel(this.roleRepository, query.id, query);
  }
  @HttpCode(HttpStatus.OK)
  @Post('del')
  remove(@Body() query: CreateRoleDto) {
    return this.commonService.delModel(this.roleRepository, query.id);
  }
}
