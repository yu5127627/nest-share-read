import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class LoginManagerDto {
  @ApiProperty({
    description: '账号',
    required: true,
    example: 'admin'
  })
  @IsNotEmpty({ message: '请输入账号' })
  @MinLength(3, { message: '账号长度至少为3' })
  @MaxLength(10, { message: '账号长度至多为10' })
  readonly username: string

  @ApiProperty({ description: '密码', required: true, example: '123456' })
  @IsNotEmpty({ message: '请输入密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  password: string

  readonly create_time?: number

  login_time?: number
}
