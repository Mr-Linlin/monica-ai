import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { OssService } from './oss.service';
import { CommonController } from './common.controller';

@Module({
  controllers: [CommonController],
  providers: [CommonService, OssService],
})
export class CommonModule { }
