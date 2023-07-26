import { Injectable } from '@nestjs/common';
import { OssService } from './oss.service';
import path = require('path');
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/chat/entities/category.entity';
import { Prompt } from 'src/chat/entities/prompt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    private readonly ossService: OssService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Prompt)
    private promptRepository: Repository<Prompt>,
  ) { }
  async uploadImage(file: Express.Multer.File): Promise<any> {
    try {
      const time = this.getDateWithRandom();
      const localFilePath = path.join(__dirname, './upload');
      const ossUrl = await this.ossService.putOssFile(
        `avatar/${time}${file.originalname}`,
        `${localFilePath}/${file.originalname}`,
      );
      return {
        code: 200,
        data: ossUrl,
        message: '上传成功',
      };
    } catch (error) {
      return {
        code: 403,
        msg: `上传失败,${error}`,
      };
    }
  }
  getDateWithRandom(): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 90000 + 10000).toString();
    return `${year}${month}${day}${hour}${minute}${second}${random}`;
  }
  async modelDel(apiName: string, id: number) {
    let res: any = [];
    switch (apiName) {
      case 'categoryRepository':
        res = await this.categoryRepository.delete(id);
        break;
      case 'promptRepository':
        res = await this.promptRepository.delete(id);
        break;
    }
    if (res.affected === 0) {
      return { code: 201, messag: '用户不存在!' };
    }
    return { code: 200, message: '删除成功' };
  }
  /**
   *
   * @param apiName 查询表名
   * @param query 查询参数
   * @returns 返回查询列表
   */
  async findModelAll(apiName: string, query: any) {
    const propsToCheck = ['pageSize', 'page'];
    const hasAllProps = propsToCheck.every((prop) => {
      return query.hasOwnProperty(prop);
    });
    if (!hasAllProps) {
      return { code: 201, message: '请检查参数是否正确' };
    }
    const { pageSize, page, ...obj } = query;
    let data: any = [];
    const q = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: obj,
    };
    switch (apiName) {
      case 'categoryRepository':
        data = await this.categoryRepository.find(q);
        break;
      case 'promptRepository':
        data = await this.promptRepository.find(q);
        break;
    }
    return { code: 200, data, total: data.length };
  }
}
