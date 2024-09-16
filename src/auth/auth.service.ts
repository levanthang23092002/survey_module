import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
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

  register = async (userData: RegisterDto): Promise<any> => {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      throw new HttpException(
        { message: 'This email has already been used' },
        HttpStatus.BAD_REQUEST,
      );
    }


    const { userName, passWord, confirmPassWord, ...rest } = userData;
    if (passWord !== confirmPassWord) {
      throw new HttpException(
        { message: 'password and confirm password must be equal' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUserData = {
      ...rest,
      username: userName,
      role: 'user',
      password: passWord,
    };

    // Lưu người dùng vào cơ sở dữ liệu mà không mã hóa mật khẩu
    const newUser = await this.prisma.user.create({
      data: newUserData,
    });

    return newUser;
  };
}
