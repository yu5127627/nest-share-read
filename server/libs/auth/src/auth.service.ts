import { User } from '@app/db/entity/user.entity';
import { Manager } from './../../db/src/entity/manager.entity';
import { PayloadDto } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { getConnection, Repository } from 'typeorm';
import { UserTokenPayloadDto } from './dto/user-token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // 认证后台管理账号密码
  async validateManager(username: string, password: string): Promise<Manager> {
    let manager = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(Manager, 'user')
      .where('user.username =:username ', { username })
      .addSelect('user.password')
      .getOne();
    manager.login_time = Date.now();
    await this.managerRepository.save(manager);

    if (!manager) {
      throw new BadRequestException('用户不存在');
    }
    if (!compareSync(password, manager.password)) {
      throw new BadRequestException('密码错误');
    }

    return manager;
  }

  async setToken(user: PayloadDto): Promise<{ access_token: string }> {
    const { username, id, roles } = user;
    const payload = { username, id, roles };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  // 认证 app 账号密码
  async validateUser(username: string, password: string): Promise<User> {
    let user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email =:email ', { email: username })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }
    user.login_time = Date.now();
    await this.userRepository.save(user);

    return user;
  }

  async setUserToken(user: UserTokenPayloadDto): Promise<{ token: string }> {
    const { email, id } = user;
    const payload = { email, id };
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
