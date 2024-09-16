import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtservice;
    constructor(prisma: PrismaService, jwtservice: JwtService);
    login: (data: LoginDto) => Promise<any>;
    register: (userData: RegisterDto) => Promise<any>;
}
