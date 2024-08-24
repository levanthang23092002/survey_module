import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service'; // Đảm bảo đường dẫn đúng
import { AuthService } from './auth.service'; // Đảm bảo đường dẫn đúng
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

    const loginDto = { email: 'test@example.com', passWord: 'password123' };

    await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
  });

  it('should return an access token and payload if user exists', async () => {
    const user = {
      userid: 1,
      username: 'johndoe',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      createdAt: '2024-08-22T10:00:00Z',
      updatedAt: '2024-08-23T15:30:00Z',
      deletedAt: null,
    };

    const accessToken = 'fakeAccessToken';
    const payload = {
      userId: user.userid,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
    (jwtService.signAsync as jest.Mock).mockResolvedValue(accessToken);

    const loginDto = { email: 'test@example.com', passWord: 'password123' };
    const result = await service.login(loginDto);

    expect(result).toEqual({ accesstoken: accessToken, payload });
  });
});
