import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  /**
   *
   * @param phone
   * @param pass
   * @returns 登录
   */
  async signIn(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(phone);

    if (!user || user.password !== pass) {
      return { code: 201, message: '手机号或密码不正确' };
    }
    const { password, ...obj } = user;
    const payload = { password, phone, id: obj.id };

    const access_token = await this.jwtService.signAsync(payload);
    if (access_token) {
      return {
        code: 200,
        access_token,
        user: obj,
        message: '登录成功',
      };
    }
  }
  async register(user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}
