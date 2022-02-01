import { Test, TestingModule } from '@nestjs/testing';
import { ThebridgeController } from './thebridge.controller';

describe('Thebridge Controller', () => {
  let controller: ThebridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThebridgeController],
    }).compile();

    controller = module.get<ThebridgeController>(ThebridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
