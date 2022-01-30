import { Test, TestingModule } from '@nestjs/testing';
import { SkywarsController } from './skywars.controller';

describe('Skywars Controller', () => {
  let controller: SkywarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkywarsController],
    }).compile();

    controller = module.get<SkywarsController>(SkywarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
