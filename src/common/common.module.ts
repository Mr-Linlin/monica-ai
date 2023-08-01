import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { OssService } from './oss.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/chat/entities/category.entity';
import { Prompt } from 'src/chat/entities/prompt.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Prompt, Role])],
  controllers: [CommonController],
  providers: [CommonService, OssService],
  exports: [CommonService, TypeOrmModule],
})
export class CommonModule { }
