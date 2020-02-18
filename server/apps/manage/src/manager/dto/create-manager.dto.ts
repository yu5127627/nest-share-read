import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { Manager } from '@app/db/entity/manager.entity';

export class CreateManagerDto extends Manager {
  @IsNotEmpty({ message: '请输入账号' })
  @MinLength(3, { message: '账号长度至少为3' })
  @MaxLength(10, { message: '账号长度至多为10' })
  readonly username: string;

  @IsNotEmpty({ message: '请输入密码' })
  @MinLength(6, { message: '密码长度至少为6' })
  @MaxLength(16, { message: '密码长度至多为16' })
  password: string;

  @IsString({ message: '务必选择一个权限' })
  roles: string;
}
