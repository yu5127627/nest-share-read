import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({ description: '中文名称', required: true, example: '前端' })
  @IsNotEmpty({ message: '请输入中文名称' })
  zh_name: string

  @ApiProperty({ description: '英文名称', required: true, example: 'web' })
  @IsNotEmpty({ message: '请输入英文名称' })
  en_name: string
}
