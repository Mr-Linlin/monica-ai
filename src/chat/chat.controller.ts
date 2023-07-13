import { Controller, Post, Body, Sse, Headers } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CHAT_URL } from '../config/config';
interface MessageEvent {
  data: string | object;
}

@Controller('chat')
export class ChatController {
  constructor(private httpService: HttpService) { }

  @Post('completion')
  @Sse('completion')
  async completion(@Body() obj: any): Promise<Observable<MessageEvent>> {
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
}
