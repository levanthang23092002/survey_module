import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(), // Mock phương thức login
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token and user details if login is successful', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        passWord: 'password',
      };
      const mockResult = {
        accesstoken: 'mockToken',
        payload: {
          userId: 1,
          name: 'John Doe',
          email: 'test@example.com',
        },
      };

      jest.spyOn(authService, 'login').mockResolvedValue(mockResult);

      const result = await authController.login(loginDto);

      expect(result).toEqual(mockResult);
    });

    it('should throw NotFoundException if login fails', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        passWord: 'wrongPassword',
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(
          new NotFoundException('Account is not exist Or Block'),
        );

      await expect(authController.login(loginDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(authController.login(loginDto)).rejects.toThrow(
        'Account is not exist Or Block',
      );
    });
  });
});
