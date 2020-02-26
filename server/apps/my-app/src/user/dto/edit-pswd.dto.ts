import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditPswdDto {
  @ApiProperty({
    description: '旧密码',
    required: true,
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入当前密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  readonly oldPswd: string;

  @ApiProperty({
    description: '新密码',
    required: true,
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入新密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  readonly firstPswd: string;

  @ApiProperty({
    description: '再次输入新密码',
    required: true,
    example: '123456'
  })
  @IsNotEmpty({ message: '请再次输入新密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  readonly secondPswd: string;
}
