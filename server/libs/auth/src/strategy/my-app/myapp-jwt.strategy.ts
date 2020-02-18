import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserTokenPayloadDto } from '@app/auth/dto/user-token-payload.dto';

@Injectable()
export class MyappJwtStrategy extends PassportStrategy(Strategy, 'myapp-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.MANAGE_AUTH_SECRET
    });
  }

  async validate(payload: UserTokenPayloadDto) {
    const { id, email } = payload;
    return { id, email };
  }
}
