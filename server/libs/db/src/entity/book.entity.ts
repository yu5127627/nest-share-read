import { BookActions } from './book-actions.entity';
import { Category } from './category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '中文名称',
    required: true,
    example: 'vue.js深入浅出'
  })
  @Column('varchar')
  zh_name: string;

  @ApiProperty({ description: '英文名称', required: true, example: 'vue.js' })
  @Column('varchar')
  en_name: string;

  @ApiProperty({
    description: '图书',
    required: true,
    example: 'https://file.ituring.com.cn/SmallCover/19079fff942994b2fff5'
  })
  @Column('varchar')
  book: string; //图书

  @ApiProperty({
    description: '图书封面',
    required: true,
    example: 'upload/images/covers/1580830233290.png'
  })
  @Column('varchar')
  cover: string; //封面

  @ApiProperty({
    description: '图书概述',
    required: true
  })
  @Column('text')
  description: string; //描述

  @ApiProperty({
    description: '图书特点',
    required: false
  })
  @Column({ type: 'text', default: null })
  feature: string; //特点

  @ApiProperty({
    description: '出版日期',
    required: true,
    example: '1579508386'
  })
  @Column('varchar')
  create_time: string; //出版日期

  @ApiProperty({
    description: '图书总页数',
    required: true,
    example: '1200'
  })
  @Column({ type: 'smallint' })
  total_page: number; //总页数

  @ApiProperty({
    description: '目录截图',
    required: true,
    example: [
      'upload/images/catalog/1580830233343.png',
      'upload/images/catalog/1580830233345.png'
    ]
  })
  @Column({ type: 'text' })
  catalog: string; //目录照片

  @ApiProperty({
    description: '关于作者',
    required: true,
    example:
      '贾森·迈尔斯（Jason Myers），Built Technologies平台首席工程师，Juice Analytics公司高级开发者，曾在思科公司担任技术主管。在转做开发前，曾做过15年系统架构师。'
  })
  @Column('text')
  about_author: string; //关于作者

  @ApiProperty({
    description: '是否热门',
    required: true,
    example: 1
  })
  @Column({ default: 0 })
  is_hot: number;

  @ApiProperty({
    description: '是否推荐',
    required: true,
    example: 1
  })
  @Column({ default: 0 })
  is_recommend: number;

  @ApiProperty({
    description: '最新上架',
    required: true,
    example: 1
  })
  @Column({ default: 0 })
  is_new: number;

  @ApiProperty({
    description: '所属类别id',
    required: true,
    example: 3
  })
  @ManyToOne(
    type => Category,
    category => category.book
  )
  category: Category;

  @OneToOne(
    type => BookActions,
    bookActions => bookActions.book,
    {
      cascade: true // 级联自动保存
    }
  )
  @JoinColumn()
  bookActions: BookActions;
}
