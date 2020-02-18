import { User } from '@app/db/entity/user.entity';
import { AuthService } from '../../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class MyappLocalStrategy extends PassportStrategy(
  Strategy,
  'myapp-local'
) {
  constructor(private readonly authService: AuthService) {
    super({
      // 指定对应的账号密码字段
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<User> {
    return await this.authService.validateUser(username, password);
  }
}
