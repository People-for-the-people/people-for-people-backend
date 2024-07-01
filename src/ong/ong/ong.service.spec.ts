import { Test, TestingModule } from '@nestjs/testing';
import { OngService } from './ong.service';

describe('OngService', () => {
  let service: OngService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OngService],
    }).compile();

    service = module.get<OngService>(OngService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
