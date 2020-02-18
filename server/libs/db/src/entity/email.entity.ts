import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Email {
  @ApiProperty({
    description: '邮件id',
    required: true,
    example: '9c0c9763-e55f-a70d-4ae0-2480fc66eec3@qq.com'
  })
  @PrimaryColumn()
  id: string;

  @ApiProperty({
    description: '邮箱',
    required: true,
    example: '421821209@qq.com'
  })
  @Column()
  email: string;

  @ApiProperty({
    description: '验证码',
    required: true,
    example: 'cbha23'
  })
  @Column()
  code: string;

  @ApiProperty({
    description: '失效时间',
    required: true
  })
  @Column({
    type: 'bigint'
  })
  fail_time: number;
}
