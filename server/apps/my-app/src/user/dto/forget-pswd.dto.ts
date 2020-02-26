import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPswdDto {
  @ApiProperty({
    description: '邮箱',
    required: true,
    example: '421821209@qq.com'
  })
  @IsEmail({ allow_display_name: true }, { message: '请输入正确的邮箱' })
  readonly email: string;

  @IsNotEmpty({ message: '请输入验证码' })
  @ApiProperty({ description: '验证码', required: true })
  readonly code: string;

  @ApiProperty({ description: '邮件id', required: true })
  readonly emailId: string;
}
