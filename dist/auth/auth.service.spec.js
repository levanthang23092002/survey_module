"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
describe('AuthService', () => {
    let service;
    let prismaService;
    let jwtService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                    },
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        prismaService = module.get(prisma_service_1.PrismaService);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should throw NotFoundException if user does not exist', async () => {
        prismaService.user.findUnique.mockResolvedValue(null);
        const loginDto = { email: 'test@example.com', passWord: 'password123' };
        await expect(service.login(loginDto)).rejects.toThrow(common_1.NotFoundException);
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
        prismaService.user.findUnique.mockResolvedValue(user);
        jwtService.signAsync.mockResolvedValue(accessToken);
        const loginDto = { email: 'test@example.com', passWord: 'password123' };
        const result = await service.login(loginDto);
        expect(result).toEqual({ accesstoken: accessToken, payload });
    });
});
//# sourceMappingURL=auth.service.spec.js.map