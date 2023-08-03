import {
  Controller,
  Post,
  Body,
  Sse,
  Headers,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CHAT_URL } from '../config/config';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { jwtConstants } from '../auth/constants';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { CommonService } from '../common/common.service';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Prompt } from './entities/prompt.entity';

interface MessageEvent {
  data: string | object;
}

@Controller('chat')
export class ChatController {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    private chatService: ChatService,
    private commonService: CommonService,
    private userService: UsersService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Prompt)
    private promptRepository: Repository<Prompt>,
  ) { }

  @Post('completion')
  @Sse('completion')
  async completion(
    @Body() obj: any,
    @Headers() hearder: any,
  ): Promise<Observable<MessageEvent> | string> {
    // 验证会员等级和回答次数
    const token = this.chatService.extractTokenFromHeader(
      hearder.authorization,
    );
    const { id } = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    const user = await this.chatService.getBuyChatTimes(id);
    if (user && user.chat_times < user.buy_chat_times) {
      if (obj.messages.length > 0) {
        obj.messages.forEach((item: any) => {
          delete item.time;
        });
      }
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
      observer.next('{"content":"今日查询次数已达上限"}');
      observer.complete();
    });
    return res.pipe(map((data) => ({ data: { data } })));
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/category/add')
  async categoryAdd(
    @Body() createUserDto: CreateCategoryDto,
    @Headers() hearder: any,
  ) {
    const userId = await this.userService.extractToken(hearder.authorization);
    createUserDto.userId = userId;
    const where = {
      name: createUserDto.name,
      userId,
    };
    return this.commonService.addModel<CreateCategoryDto>(
      this.categoryRepository,
      createUserDto,
      where,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/category/del')
  categoryDel(@Body() query: CreateCategoryDto) {
    return this.commonService.delModel(this.categoryRepository, query.id);
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/category/edit')
  categoryEdit(@Body() query: CreateCategoryDto) {
    return this.commonService.editModel(
      this.categoryRepository,
      query.id,
      query,
    );
  }
  @Get('prompt/category/list')
  @HttpCode(HttpStatus.OK)
  async findCategotyAll(@Query() query: any, @Headers() hearder: any) {
    const userId = await this.userService.extractToken(hearder.authorization);
    query.userId = userId;
    return this.commonService.findModelAll(this.categoryRepository, query);
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/add')
  async promptAdd(@Body() prompt: CreatePromptDto, @Headers() hearder: any) {
    const userId = await this.userService.extractToken(hearder.authorization);
    prompt.userId = userId;
    const where = {
      name: prompt.name,
      userId,
    };
    return this.commonService.addModel<CreatePromptDto>(
      this.promptRepository,
      prompt,
      where,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/del')
  promptDel(@Body() query: CreatePromptDto) {
    return this.commonService.delModel(this.promptRepository, query.id);
  }
  @HttpCode(HttpStatus.OK)
  @Post('prompt/edit')
  promptEdit(@Body() query: CreatePromptDto) {
    return this.commonService.editModel(this.promptRepository, query.id, query);
  }
  @Get('prompt/list')
  @HttpCode(HttpStatus.OK)
  async findPromptAll(@Query() query: any, @Headers() hearder: any) {
    const userId = await this.userService.extractToken(hearder.authorization);
    query.userId = userId;
    return this.commonService.findModelAll(this.promptRepository, query);
  }
}
