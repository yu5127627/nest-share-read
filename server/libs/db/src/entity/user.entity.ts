import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '邮箱',
    required: true,
    example: '123456@qq.com'
  })
  @Column()
  email: string;

  @ApiProperty({
    description: '昵称',
    required: true,
    example: 'test'
  })
  @Column()
  username: string;

  @ApiProperty({ description: '密码', required: true, example: '123456' })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: '头像',
    required: false,
    example:
      'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg'
  })
  @Column({
    default:
      'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg'
  })
  avatar?: string;

  @ApiProperty({
    description: '注册时间',
    required: false,
    example: 1581692214957
  })
  @Column({
    type: 'bigint',
    default: 0
  })
  register_time?: number;

  @ApiProperty({
    description: '最后一次登录时间',
    required: false,
    example: 1581692214957
  })
  @Column({
    type: 'bigint',
    default: 0
  })
  login_time?: number;
}
