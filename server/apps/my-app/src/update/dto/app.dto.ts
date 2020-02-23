import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppDto {
  @ApiProperty({
    description: 'app id',
    required: true,
    example: '__UNI__BF91653'
  })
  @IsNotEmpty({ message: 'appid 不得为空' })
  readonly appid: string;

  @ApiProperty({
    description: '客户端app版本号',
    required: true,
    example: '1.0.2'
  })
  @IsNotEmpty({ message: 'app 版本号不得为空' })
  readonly version: string;
}
