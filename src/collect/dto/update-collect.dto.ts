import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectDto } from './create-collect.dto';

export class UpdateCollectDto extends PartialType(CreateCollectDto) {}
