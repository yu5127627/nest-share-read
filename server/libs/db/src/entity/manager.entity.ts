import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: '账号',
    required: true,
    example: 'admin'
  })
  username: string;

  @ApiProperty({
    description: '密码',
    required: true,
    example: '123456'
  })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: '权限',
    required: true,
    example: 'admin'
  })
  @Column({ default: 'admin' })
  roles: string;

  @ApiProperty({
    description: '头像',
    required: false,
    example:
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1640434779,3971610929&fm=26&gp=0.jpg'
  })
  @Column({
    default:
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1640434779,3971610929&fm=26&gp=0.jpg'
  })
  avatar?: string;

  @ApiProperty({
    description: '创建时间',
    required: false
  })
  @Column({ type: 'bigint', default: 0 })
  create_time?: number;

  @ApiProperty({
    description: '最后一次登录时间',
    required: false
  })
  @Column({ type: 'bigint', default: 0 })
  login_time?: number;
}
