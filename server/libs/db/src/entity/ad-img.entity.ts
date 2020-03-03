import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class AdImg {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    enum: [1, 2],
    description: '类型',
    required: true,
    example: 1
  })
  // 1:启动图   2:轮播图
  @Column({ default: 2 })
  type: number;

  @ApiProperty({
    description: '地址',
    required: true,
    example:
      'http://img2.imgtn.bdimg.com/it/u=540844892,1263014220&fm=11&gp=0.jpg'
  })
  @Column()
  url: string;

  @ApiProperty({
    enum: [0, 1],
    description: '是否允许跳转',
    required: true,
    example: 1
  })
  // 0: 禁止   1: 允许
  @Column({ default: 0 })
  is_href: number;

  @ApiProperty({
    description: '跳转地址',
    example: null
  })
  @Column({ default: null })
  href_url: string;

  @ApiProperty({
    enum: [0, 1],
    description: '状态',
    example: 0
  })
  // 0: 禁用   1: 启用
  @Column({ default: 0 })
  status: number;

  @ApiProperty({
    description: '所属图书类别id',
    required: true,
    example: 4
  })
  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(
    type => Category,
    category => category.adImg
  )
  category: Category[];
}
