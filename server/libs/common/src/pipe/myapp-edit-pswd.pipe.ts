import { EditPswdDto } from './../../../../apps/my-app/src/user/dto/edit-pswd.dto';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Injectable()
export class MyappEditPswdPipe implements PipeTransform {
  async transform(editPswdDto: EditPswdDto, metadata: ArgumentMetadata) {
    const { oldPswd, firstPswd, secondPswd } = editPswdDto;

    if (oldPswd === firstPswd) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: '新密码不能和当前密码一致'
        },
        400
      );
    } else if (firstPswd !== secondPswd) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: '新密码两次输入不一致'
        },
        400
      );
    }

    return editPswdDto;
  }
}
