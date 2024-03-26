import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {

    
    
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
