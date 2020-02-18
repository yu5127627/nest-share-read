import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class DeleteManagerDto {
  @ApiProperty({
    description: 'id',
    required: true,
    example: '1'
  })
  @IsNotEmpty({ message: '请输入用户id' })
  readonly id: number
}
