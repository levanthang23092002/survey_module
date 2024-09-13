"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
describe('UserController', () => {
    let authController;
    let authService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
            providers: [
                {
                    provide: auth_service_1.AuthService,
                    useValue: {
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();
        authController = module.get(auth_controller_1.AuthController);
        authService = module.get(auth_service_1.AuthService);
    });
    describe('login', () => {
        it('should return an access token and user details if login is successful', async () => {
            const loginDto = {
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
            const loginDto = {
                email: 'test@example.com',
                passWord: 'wrongPassword',
            };
            jest
                .spyOn(authService, 'login')
                .mockRejectedValue(new common_1.NotFoundException('Account is not exist Or Block'));
            await expect(authController.login(loginDto)).rejects.toThrow(common_1.NotFoundException);
            await expect(authController.login(loginDto)).rejects.toThrow('Account is not exist Or Block');
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map