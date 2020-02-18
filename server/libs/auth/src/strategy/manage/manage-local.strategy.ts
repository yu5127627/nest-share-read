import { Manager } from '@app/db/entity/manager.entity';
import { AuthService } from '../../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ManageLocalStrategy extends PassportStrategy(
  Strategy,
  'manage-local'
) {
  constructor(private readonly authService: AuthService) {
    super({
      // 指定对应的账号密码字段
      usernameField: 'username',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<Manager> {
    return await this.authService.validateManager(username, password);
  }
}
