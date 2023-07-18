import { Controller, Post, Body, Sse, Headers } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CHAT_URL } from '../config/config';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { jwtConstants } from '../auth/constants';

interface MessageEvent {
  data: string | object;
}

@Controller('chat')
export class ChatController {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    private chatService: ChatService,
  ) { }

  @Post('completion')
  @Sse('completion')
  async completion(
    @Body() obj: any,
    @Headers() hearder: any,
  ): Promise<Observable<MessageEvent> | string> {
    // 验证会员等级和回答次数
    const token = this.extractTokenFromHeader(hearder.authorization);
    const { id } = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    const user = await this.chatService.getBuyChatTimes(id);
    if (user && user.chat_times < user.buy_chat_times) {
      const response = this.httpService.post(CHAT_URL, obj, {
        responseType: 'stream', // 设置响应类型为流
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const chatStream$ = new Observable<string>((observer) => {
        response.subscribe((response) => {
          response.data.on('data', (chunk: string) => {
            const message = chunk.toString();
            observer.next(message); // 将从第三方接口返回的数据流实时传递给前端
            response.data.on('end', () => {
              observer.complete(); // 在数据流结束时发送 complete 通知
            });
          });
        });
      });
      return chatStream$.pipe(map((data) => ({ data: { data } })));
    }
    const res = new Observable<string>((observer) => {
      observer.next('{"content":"今日查询次数已达上限！"}');
      observer.complete();
    });
    return res.pipe(map((data) => ({ data: { data } })));
  }
  extractTokenFromHeader(authorization: any): string {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }
}
