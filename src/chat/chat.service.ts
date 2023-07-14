import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatService {
  constructor(private userService: UsersService) { }
  /**
   *
   * @param id 用户id
   * @return '返回用户剩余提问次数'
   */
  async getBuyChatTimes(id: number) {
    this.increaseBuyChatTimes(id);
    return this.userService.getCount(id);
  }
  async increaseBuyChatTimes(id: number) {
    return this.userService.increaseBuyChatTimes(id);
  }
}
