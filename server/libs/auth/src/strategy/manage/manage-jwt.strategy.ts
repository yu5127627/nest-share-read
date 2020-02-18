import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../../dto/payload.dto';

@Injectable()
export class ManageJwtStrategy extends PassportStrategy(
  Strategy,
  'manage-jwt'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.MANAGE_AUTH_SECRET
    });
  }

  async validate(payload: PayloadDto) {
    const { id, username, roles } = payload;
    return { id, username, roles };
  }
}
