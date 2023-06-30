import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TestController } from './test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TestService],
  controllers: [TestController],
  exports: [TypeOrmModule, TestService],
})
export class TestModule { }
