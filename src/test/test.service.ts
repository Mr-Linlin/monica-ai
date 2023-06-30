import { Injectable } from '@nestjs/common';
import { Test, TestQuery } from './interfaces/test.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  /**
   * @param test 添加参数
   * @return 返回成功
   */
  async addTest(test: Test) {
    const res = await this.usersRepository.save(test);
    if (res) {
      return { code: 200, data: res };
    } else {
      return { code: 201, data: [] };
    }
  }
  async getTest(query: TestQuery) {
    const [users, total] = await this.usersRepository.findAndCount({
      take: query.pageSize,
      skip: (query.page - 1) * query.pageSize,
    });
    console.log(users);
    return { code: 200, data: users, total };
  }
}
