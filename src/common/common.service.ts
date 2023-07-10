import { Injectable } from '@nestjs/common';
import { OssService } from './oss.service';
import path = require('path');

@Injectable()
export class CommonService {
  constructor(private readonly ossService: OssService) { }
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
}
