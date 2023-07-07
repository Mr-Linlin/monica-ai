import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { interval, map, Observable, takeWhile, Subject } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Injectable()
export class ChatService {
  constructor(private httpService: HttpService) { }
  private chatStream = new Subject<string>();
  async getCompleteEvent(): Promise<Observable<MessageEvent>> {
    const data = {
      messages: [
        {
          role: 'system',
          content: '你好，我是一个智能AI，你可以向我问些问题。',
        },
        {
          role: 'user',
          content: '写一个社交项目，你给我创建数据库',
        },
        {
          content:
            '<p>好的，以下是一个简单的社交项目的数据库设计：</p>\n<p>用户表(User)</p>\n<ul>\n<li>userId(用户ID) - 主键</li>\n<li>username(用户名)</li>\n<li>password(密码)</li>\n<li>email(邮箱)</li>\n<li>gender(性别)</li>\n<li>birthday(生日)</li>\n<li>bio(个人简介)</li>\n<li>avatar(头像)</li>\n</ul>\n<p>好友关系表(Friendship)</p>\n<ul>\n<li>id(关系ID) - 主键</li>\n<li>user1Id(用户1 ID) - 外键，关联User表</li>\n<li>user2Id(用户2 ID) - 外键，关联User表</li>\n<li>status(状态) - 枚举值: 0-待确认，1-已确认，2-已拒绝</li>\n</ul>\n<p>帖子表(Post)</p>\n<ul>\n<li>postId(帖子ID) - 主键</li>\n<li>userId(用户ID) - 外键，关联User表</li>\n<li>content(内容)</li>\n<li>createTime(创建时间)</li>\n</ul>\n<p>评论表(Comment)</p>\n<ul>\n<li>commentId(评论ID) - 主键</li>\n<li>postId(帖子ID) - 外键，关联Post表</li>\n<li>userId(用户ID) - 外键，关联User表</li>\n<li>content(内容)</li>\n<li>createTime(创建时间)</li>\n</ul>\n<p>点赞表(Like)</p>\n<ul>\n<li>likeId(点赞ID) - 主键</li>\n<li>postId(帖子ID) - 外键，关联Post表</li>\n<li>userId(用户ID) - 外键，关联User表</li>\n<li>createTime(创建时间)</li>\n</ul>\n<p>以上是一个简单的社交项目的数据库设计。当然，具体的数据库设计需要根据业务需求灵活变化，以上只是提供参考。</p>\n',
          role: 'system',
        },
        {
          role: 'user',
          content: 'es6写一个去重函数',
        },
      ],
      temperature: 1.2,
      max_tokens: 200,
    };
    const url = 'https://ejcvirv.belikehub.com:30003/v3/getChatStream';
    const response = this.httpService.post(url, data, {
      responseType: 'stream', // 设置响应类型为流
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.subscribe((response) => {
      response.data.on('data', (chunk: any) => {
        console.log(chunk.toString(), '==='); // 输出从 getChatStream 接口返回的数据流
      });
    });
    return interval(1000).pipe(
      map((_) => ({ data: { hello: '测试' } })),
      takeWhile(() => false),
    );
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #$`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
