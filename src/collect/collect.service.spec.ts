import { Test, TestingModule } from '@nestjs/testing';
import { CollectService } from './collect.service';

describe('CollectService', () => {
  let service: CollectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectService],
    }).compile();

    service = module.get<CollectService>(CollectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
