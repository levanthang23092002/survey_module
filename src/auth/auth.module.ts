import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.Access_Token_Key, // Cung cấp secret key tại đây
      signOptions: { expiresIn: '60s' }, // Tuỳ chọn khác cho JWT
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
