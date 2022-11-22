import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      validateUser: (username: string, password: string): Promise<any> => {
        return Promise.resolve({
          userId: 2,
          username: 'user',
          password: 'user',
          userType: 'Technician'
        });
      },
      login: async (user: any) => {
        return {
          access_token: '1234',
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const login = await controller.login({
      user: {
        userId: 1,
        userType: 'Technician',
        username: 'user'
      }
    });
    expect(login).toBeDefined();
  });

  it('should profile', async () => {
    const profile = await controller.getProfile({
      user: {
        userId: 1,
        userType: 'Technician',
        username: 'user'
      }
    });
    expect(profile).toBeDefined();
  });
});
