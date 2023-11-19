import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CreateCollectDto } from './dto/create-collect.dto';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) { }

  @Post('data')
  @HttpCode(HttpStatus.OK)
  collectData(@Body() createCollectDto: CreateCollectDto) {
    return this.collectService.collectData(createCollectDto);
  }
}
