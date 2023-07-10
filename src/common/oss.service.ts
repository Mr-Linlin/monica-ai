import * as OSS from 'ali-oss';
import { Injectable } from '@nestjs/common';
import ossConfig from 'src/config/oss';

@Injectable()
export class OssService {
  private client: any;
  public constructor() {
    this.client = new OSS({
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      region: ossConfig.region,
      bucket: ossConfig.bucket,
    });
  }
  create(file: Express.Multer.File) {
    console.log(file);

    return 'This action adds a new common';
  }
  // 创建存储空间。
  private async putBucket() {
    try {
      const options = {
        storageClass: 'Archive', // 存储空间的默认存储类型为标准存储，即Standard。如果需要设置存储空间的存储类型为归档存储，请替换为Archive。
        acl: 'public-read', // 存储空间的默认读写权限为私有，即private。如果需要设置存储空间的读写权限为公共读，请替换为public-read。
        dataRedundancyType: 'ZRS', // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
      };
      const result = await this.client.putBucket('test');
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  // 列举所有的存储空间
  private async listBuckets() {
    try {
      const result = await this.client.listBuckets();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  // 上传文件到oss 并返回  图片oss 地址
  public async putOssFile(ossPath: string, localPath: string): Promise<string> {
    let res: any;
    try {
      res = await this.client.put(ossPath, localPath);
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, 'public-read');
    } catch (error) {
      console.log(error);
    }
    return res.url;
  }
  /**
   * 获取文件的url
   * @param filePath
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log('get file signature failed: file name can not be empty');
      return '';
    }
    let result = '';
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 });
    } catch (err) {
      console.log(err);
    }
    return result;
  }
  /**
   * 上传文件大小校验
   * @param localPath
   * @param ossPath
   * @param size
   */
  public async validateFile(
    ossPath: string,
    localPath: string,
    size: number,
  ): Promise<string> {
    if (size > 5 * 1024 * 1024) {
      return '';
    } else {
      return await this.putOssFile(ossPath, localPath);
    }
  }
}
