import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { HttpModule } from '@nestjs/axios';
import { CollectController } from './collect.controller';

@Module({
  imports: [HttpModule],
  controllers: [CollectController],
  providers: [CollectService],
})
export class CollectModule { }
