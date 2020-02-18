import { User } from '@app/db/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MyappRegisterPipe implements PipeTransform {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async transform(user: any, metadata: ArgumentMetadata) {
    const { email } = user;
    const isUser = await this.userRepository.findOne({ email });
    if (isUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: '该邮箱已注册！'
        },
        400
      );
    }

    return user;
  }
}
