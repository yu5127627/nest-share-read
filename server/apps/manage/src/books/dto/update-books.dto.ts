import { Category } from 'libs/db/src/entity/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ManyToOne } from 'typeorm';

export class UpdateBooksDto {
  @ApiProperty({
    description: '中文名称',
    required: false,
    example: 'vue.js深入浅出'
  })
  @IsNotEmpty({ message: '请输入中文书名' })
  zh_name?: string;

  @ApiProperty({ description: '英文名称', required: false, example: 'vue.js' })
  @IsNotEmpty({ message: '请输入英文书名' })
  en_name?: string;

  @ApiProperty({
    description: '图书',
    required: true,
    example: 'https://file.ituring.com.cn/SmallCover/19079fff942994b2fff5'
  })
  @IsNotEmpty({ message: '请上传要替换的图书' })
  book: string; //图书

  @ApiProperty({
    description: '图书封面',
    required: false,
    example: 'upload/images/covers/1580830233290.png'
  })
  @IsNotEmpty({ message: '请添加此书封面图' })
  cover?: string; //封面

  @ApiProperty({
    description: '图书概述',
    required: false
  })
  @IsNotEmpty({ message: '请位本书添加描述' })
  description?: string; //描述

  @ApiProperty({
    description: '图书特点',
    required: false
  })
  @IsNotEmpty({ message: '请添加此书封面图' })
  feature?: string; //特点

  @ApiProperty({
    description: '出版日期',
    required: false,
    example: '1579508386'
  })
  @IsNotEmpty({ message: '请添加出版日期' })
  create_time?: string; //出版日期

  @ApiProperty({
    description: '图书总页数',
    required: false,
    example: '1200'
  })
  @IsNotEmpty({ message: '请添加图书总页数' })
  total_page?: number; //总页数

  @ApiProperty({
    description: '目录截图',
    required: false,
    example: [
      'upload/images/catalog/1580830233343.png',
      'upload/images/catalog/1580830233345.png'
    ]
  })
  @IsNotEmpty({ message: '请添加书籍目录照片' })
  catalog?: string; //目录照片

  @ApiProperty({
    description: '关于作者',
    required: false
  })
  @IsNotEmpty({ message: '为作者做些介绍' })
  about_author?: string; //关于作者

  @ApiProperty({
    description: '所属类别id',
    required: true,
    example: 3
  })
  @ManyToOne(
    type => Category,
    category => category.book
  )
  category: Category[];
}
