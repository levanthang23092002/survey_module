import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtservice: JwtService,
  ) {}
  login = async (data: LoginDto): Promise<any> => {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.passWord,
      },
    });
    if (!user) {
      throw new NotFoundException({ message: 'Account is not exist Or Block' });
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
}
