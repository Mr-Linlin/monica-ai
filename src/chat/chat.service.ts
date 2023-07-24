import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { Category } from './entities/category.entity';
import { Prompt } from './entities/prompt.entity';

@Injectable()
export class ChatService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Prompt)
    private promptRepository: Repository<Prompt>,
  ) { }
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
  /**
   *
   * @param category  创建分类的 DTO
   * @returns 返回新创建的分类实体
   */
  async categoryAdd(category: CreateCategoryDto) {
    const res = await this.categoryRepository.findOne({
      where: [{ name: category.name }],
    });
    if (res) {
      return { code: 201, message: '分类已存在' };
    }
    await this.categoryRepository.save(category);
    return { code: 200, message: '添加成功' };
  }
  /**
   *
   * @param prompt  创建分类的 DTO
   * @returns 返回新创建的分类实体
   */
  async promptAdd(prompt: CreatePromptDto) {
    const res = await this.promptRepository.findOne({
      where: [{ name: prompt.name }],
    });
    if (res) {
      return { code: 201, message: 'prompt已存在' };
    }
    await this.promptRepository.save(prompt);
    return { code: 200, message: '添加成功' };
  }
  extractTokenFromHeader(authorization: any): string {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }
}
