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
  /**
   *
   * @param repository 添加实体类
   * @param data 添加信息
   * @param wherr 查询条件
   */
  async addModel<T>(repository: any, data: T, wherr: any) {
    const res = await repository.findOne({
      where: [wherr],
    });
    if (res) {
      return { code: 201, message: '数据已存在' };
    }
    await repository.save(data);
    return { code: 200, message: '添加成功' };
  }
  /**
   *
   * @param repository 删除实体类
   * @param id
   * @returns 删除模板
   */
  async delModel(repository: any, id: number) {
    const res = await repository.delete(id);
    if (res.affected === 0) {
      return { code: 201, messag: '用户不存在!' };
    }
    return { code: 200, message: '删除成功' };
  }
  /**
   *
   * @param repository
   * @param id
   * @param data 更新信息
   * @return 根据id修改信息
   */
  async editModel(repository: any, id: number, data: any) {
    const existingUser = await repository.findOne({
      where: [{ id }],
    });
    if (!existingUser) {
      return { code: 201, message: 'id不存在！' };
    }
    const result = await repository.update(id, data);

    if (result.affected > 0) {
      return { code: 200, message: '更新成功' };
    }
  }
  /**
   *
   * @param repository 查询实体类
   * @param query 查询参数
   * @returns 返回查询列表模板
   */
  async findModelAll(repository: any, query: any) {
    const propsToCheck = ['pageSize', 'page'];
    const hasAllProps = propsToCheck.every((prop) => {
      return query.hasOwnProperty(prop);
    });
    if (!hasAllProps) {
      return { code: 201, message: '请检查参数是否正确' };
    }
    const { pageSize, page, ...obj } = query;
    const q = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: obj,
    };
    const [[], total] = await repository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    const data = await repository.find(q);
    return { code: 200, data, total };
  }
}
