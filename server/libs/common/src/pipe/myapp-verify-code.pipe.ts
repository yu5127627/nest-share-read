import { Email } from '@app/db/entity/email.entity';
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
export class MyappVerifyCodePipe implements PipeTransform {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>
  ) {}

  async transform(user: any, metadata: ArgumentMetadata) {
    const { emailId, email, code } = user;
    const mail = await this.emailRepository.findOne({ id: emailId });
    const currentTime = Date.now();
    if (
      !mail ||
      mail.code.toLocaleUpperCase() !== code.toLocaleUpperCase() ||
      mail.email !== email
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: '验证码错误！'
        },
        400
      );
    } else if (currentTime > Number(mail.fail_time)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: '验证码已失效！'
        },
        400
      );
    }

    return user;
  }
}
