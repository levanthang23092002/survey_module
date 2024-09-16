import { Equals, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  passWord: string;
}

export class RegisterDto {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  passWord: string;
  @IsNotEmpty()
  @ValidateIf((o) => o.passWord !== undefined)
  @Equals('passWord', { message: 'Passwords do not match' })
  confirmPassWord: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
}
