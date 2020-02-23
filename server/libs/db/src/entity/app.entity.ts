import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class App {
  @ApiProperty({
    description: 'appid',
    required: true,
    example: '__UNI__BF91653'
  })
  @PrimaryColumn()
  appid: string;

  @ApiProperty({
    description: 'app版本号',
    required: true,
    example: '1.0.2'
  })
  @Column()
  version: string;

  @ApiProperty({
    description: '更新内容',
    required: true,
    example: '常被误i悲催尾部i吧'
  })
  @Column()
  content: string;

  @ApiProperty({
    description: '热更新下载地址',
    required: true,
    example: 'http://www.12345.com'
  })
  @Column()
  hot_url: string;

  @ApiProperty({
    description: '整包更新下载地址',
    required: true,
    example: 'http://www.12345.com'
  })
  @Column()
  pack_url: string;
}
