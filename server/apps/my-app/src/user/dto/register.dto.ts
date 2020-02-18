import { User } from '@app/db/entity/user.entity';
import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import {  ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends User {
  @IsNotEmpty({ message: '请输入昵称' })
  @MinLength(3, { message: '账号长度至少为3' })
  @MaxLength(10, { message: '账号长度至多为10' })
  readonly username: string;

  @IsEmail({ allow_display_name: true }, { message: '请输入正确的邮箱' })
  readonly email: string;

  @IsNotEmpty({ message: '请输入密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  password: string;

  register_time?: number;

  @IsNotEmpty({ message: '请输入验证码' })
  @ApiProperty({ description: '验证码', required: true })
  readonly code: string;

  @ApiProperty({ description: '请添加邮件id', required: true })
  readonly emailId: string;
}
