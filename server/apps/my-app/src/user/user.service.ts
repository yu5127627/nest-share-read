import { UserActions } from './../../../../libs/db/src/entity/user-actions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/db/entity/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Email } from '@app/db/entity/email.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    @InjectRepository(UserActions)
    private readonly userActionsRepository: Repository<UserActions>
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    registerDto.register_time = Date.now();
    registerDto.password = hashSync(registerDto.password);
    const user = await this.userRepository.save(registerDto);
    await this.userActionsRepository.save({ user });
    return user;
  }

  async getUser(user): Promise<User> {
    return await this.userRepository.findOne(user.id);
  }

  async createEmail(email: Email): Promise<Email> {
    return await this.emailRepository.save(email);
  }
}
