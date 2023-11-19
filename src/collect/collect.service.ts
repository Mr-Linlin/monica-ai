import { Injectable } from '@nestjs/common';
import { CreateCollectDto } from './dto/create-collect.dto';
import axios from 'axios';

@Injectable()
export class CollectService {
  async collectData(data: CreateCollectDto) {
    const url = `https://www.ppys66.com/fl/${data.type}--------${data.type}---.html`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return {
        code: 200,
        data: response.data,
      };
    }
    return {
      code: 201,
      data: '',
    };
  }
}
