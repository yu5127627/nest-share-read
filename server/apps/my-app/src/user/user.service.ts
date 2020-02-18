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
    private readonly emailRepository: Repository<Email>
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    registerDto.register_time = Date.now();
    registerDto.password = hashSync(registerDto.password);
    return await this.userRepository.save(registerDto);
  }

  async getUser(user): Promise<User> {
    return await this.userRepository.findOne(user.id);
  }

  async createEmail(email: Email): Promise<Email> {
    return await this.emailRepository.save(email);
  }
}
