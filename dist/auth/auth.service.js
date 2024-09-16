"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtservice) {
        this.prisma = prisma;
        this.jwtservice = jwtservice;
        this.login = async (data) => {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: data.email,
                    password: data.passWord,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException({ message: 'Account is not exist Or Block' });
            }
            const payload = {
                userId: user.userid,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
            };
            const accesstoken = await this.jwtservice.signAsync(payload, {
                secret: process.env.Access_Token_Key,
                expiresIn: '1h',
            });
            return { accesstoken, payload };
        };
        this.register = async (userData) => {
            const user = await this.prisma.user.findUnique({
                where: { email: userData.email },
            });
            if (user) {
                throw new common_1.HttpException({ message: 'This email has already been used' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const { userName, passWord, confirmPassWord, ...rest } = userData;
            if (passWord !== confirmPassWord) {
                throw new common_1.HttpException({ message: 'password and confirm password must be equal' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUserData = {
                ...rest,
                username: userName,
                role: 'user',
                password: passWord,
            };
            const newUser = await this.prisma.user.create({
                data: newUserData,
            });
            return newUser;
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map