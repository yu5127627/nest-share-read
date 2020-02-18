import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '邮箱',
    required: true,
    example: '123456@qq.com'
  })
  @IsEmail({ allow_display_name: true }, { message: '请输入正确的邮箱' })
  readonly email: string;

  @ApiProperty({
    description: '密码',
    required: true,
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  password: string;
}
