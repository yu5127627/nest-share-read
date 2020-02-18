import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({
    description: '邮箱',
    required: true,
    example: '421821209@qq.com'
  })
  @IsEmail({ allow_display_name: true }, { message: '请输入正确的邮箱' })
  readonly email: string;
}
