import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  /**
   *
   * @param user 用户信息
   * @returns 注册功能
   */
  async create(user: CreateUserDto) {
    const flag = this.validatePhoneNumber(user.phone);
    if (!flag) {
      return { code: 201, message: '手机号码格式错误' };
    }
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: user.username }, { phone: user.phone }],
    });

    if (existingUser) {
      return { code: 201, message: '用户名或手机号已存在' };
    }
    const result = await this.usersRepository.save(user);
    if (result) {
      return { code: 200, message: '注册成功' };
    } else {
      return { code: 201, message: '注册失败' };
    }
  }
  /**
   *
   * @param user
   * @returns 登录成功返回用户信息和token
   */
  async login(user: CreateUserDto) {
    const flag = this.validatePhoneNumber(user.phone);

    if (!flag) {
      return { code: 201, message: '手机号码格式错误' };
    }
    const existingUser = await this.usersRepository.findOne({
      where: { phone: user.phone, password: user.password },
    });

    if (existingUser) {
      return { code: 200, message: '登录成功' };
    } else {
      return { code: 201, message: '手机号或密码不正确' };
    }
  }
  async findAll(query: any) {
    const [users, total] = await this.usersRepository.findAndCount({
      take: query.pageSize,
      skip: (query.page - 1) * query.pageSize,
    });
    return { code: 200, data: users, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, user: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: user.username }, { phone: user.phone }],
    });

    if (existingUser && existingUser.id !== id) {
      return { code: 400, message: '用户名或手机号已存在' };
    }
    const result: any = await this.usersRepository.update(id, user);

    if (result.affected > 0) {
      return { code: 200, message: '更新成功' };
    } else {
      return { code: 204, message: '未找到该用户' };
    }
  }

  async remove(id: number) {
    const result: any = await this.usersRepository.delete(id);

    if (result.affected > 0) {
      return { code: 200, message: '删除成功' };
    } else {
      return { code: 204, message: '未找到该用户' };
    }
  }
  validatePhoneNumber(phoneNumber: string): boolean {
    const regex = /^1[3456789]\d{9}$/;
    return regex.test(phoneNumber);
  }
}
