import { Category } from 'libs/db/src/entity/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OneToOne, ManyToOne } from 'typeorm';

export class CreateBooksDto {
  @ApiProperty({
    description: '中文名称',
    required: true,
    example: 'vue.js深入浅出'
  })
  @IsNotEmpty({ message: '请输入中文书名' })
  zh_name: string;

  @ApiProperty({ description: '英文名称', required: true, example: 'vue.js' })
  @IsNotEmpty({ message: '请输入英文书名' })
  en_name: string;

  @ApiProperty({
    description: '图书',
    required: true,
    example: 'upload/images/covers/1580830233290.png'
  })
  @IsNotEmpty({ message: '请上传图书' })
  book: string; //图书

  @ApiProperty({
    description: '图书封面',
    required: true,
    example: 'upload/images/covers/1580830233290.png'
  })
  @IsNotEmpty({ message: '请添加此书封面图' })
  cover: string; //封面

  @ApiProperty({
    description: '图书概述',
    required: true
  })
  @IsNotEmpty({ message: '请位本书添加描述' })
  description: string; //描述

  @ApiProperty({
    description: '图书特点',
    required: false
  })
  @IsNotEmpty({ message: '请添加此书特点' })
  feature?: string; //特点

  @ApiProperty({
    description: '出版日期',
    required: true,
    example: '1579508386'
  })
  @IsNotEmpty({ message: '请添加出版日期' })
  create_time: string; //出版日期

  @ApiProperty({
    description: '图书总页数',
    required: true,
    example: '1200'
  })
  @IsNotEmpty({ message: '请添加图书总页数' })
  total_page: number; //总页数

  @ApiProperty({
    description: '目录截图',
    required: true,
    example: [
      'upload\\images\\catalog\\1580830233343.png',
      'upload\\images\\catalog\\1580830233345.png'
    ]
  })
  @IsNotEmpty({ message: '请添加书籍目录照片' })
  catalog: string; //目录照片

  @ApiProperty({
    description: '关于作者',
    required: true,
    example:
      '贾森·迈尔斯（Jason Myers），Built Technologies平台首席工程师，Juice Analytics公司高级开发者，曾在思科公司担任技术主管。在转做开发前，曾做过15年系统架构师。'
  })
  @IsNotEmpty({ message: '为作者做些介绍' })
  about_author: string; //关于作者

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
