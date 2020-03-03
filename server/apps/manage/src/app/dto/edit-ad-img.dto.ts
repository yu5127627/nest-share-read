import { IsIn, IsNotEmpty } from 'class-validator';
import { AdImg } from '@app/db/entity/ad-img.entity';

export class EditAdImgDto extends AdImg {
  @IsIn([1, 2], { message: '类型选择错误' })
  readonly type: number;

  @IsNotEmpty({ message: '请上传一张广告图' })
  readonly url: string;

  @IsIn([0, 1], { message: '请选择是否允许跳转' })
  readonly is_href: number;
}
