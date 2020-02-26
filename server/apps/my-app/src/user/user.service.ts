import { ForgetPswdDto } from './dto/forget-pswd.dto';
import { UserTokenPayloadDto } from '@app/auth/dto/user-token-payload.dto';
import { Book } from '@app/db/entity/book.entity';
import { UserActions } from './../../../../libs/db/src/entity/user-actions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/db/entity/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Email } from '@app/db/entity/email.entity';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    @InjectRepository(UserActions)
    private readonly userActionsRepository: Repository<UserActions>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    registerDto.register_time = Date.now();
    registerDto.password = hashSync(registerDto.password);
    const user = await this.userRepository.save(registerDto);
    // 创建于用户关联的用户活动表
    await this.userActionsRepository.save({ user });
    return user;
  }

  async forgetpswd(
    forgetPswdDto: ForgetPswdDto
  ): Promise<{ default_pswd: string }> {
    const { email, code, emailId } = forgetPswdDto;
    const DEFAULT_PSWD = '123456';
    const newPassword = hashSync(DEFAULT_PSWD);
    let user = await this.userRepository.findOne({ email });
    user.password = newPassword;
    await this.userRepository.save(user);
    return { default_pswd: DEFAULT_PSWD };
  }

  async editPswd(id: number, oldPswd: string, newPswd: string) {
    let user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id =:id ', { id })
      .addSelect('user.password')
      .getOne();
    if (!compareSync(oldPswd, user.password)) {
      throw new BadRequestException('当前密码错误');
    }
    user.password = hashSync(newPswd);
    await this.userRepository.save(user);
    return true;
  }

  async getUser(user): Promise<User> {
    return await this.userRepository.findOne(user.id);
  }

  async createEmail(email: Email): Promise<Email> {
    return await this.emailRepository.save(email);
  }

  async getFavList(user: UserTokenPayloadDto): Promise<Book[]> {
    const { id } = user;
    // 根据 用户id 查询关联的用户活动表
    let { fav_list } = await this.userActionsRepository
      .createQueryBuilder('user_actions')
      .where('user_actions.userId = :userId', { userId: id })
      .getOne();

    return await this.bookRepository.findByIds(JSON.parse(fav_list), {
      select: ['id', 'zh_name', 'cover', 'description']
    });
  }
}
