import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import { CommonService } from './common.service';
import * as fs from 'fs';
import path = require('path');

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const localFilePath = path.join(__dirname, './upload');
          if (!fs.existsSync(localFilePath)) {
            fs.mkdirSync(localFilePath);
          }
          cb(null, localFilePath);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.commonService.uploadImage(file);
  }
}
