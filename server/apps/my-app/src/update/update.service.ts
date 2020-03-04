import { UpdateInfo } from './interface/update-info.interface';
import { AppDto } from './dto/app.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '@app/db/entity/app.entity';
import { Repository } from 'typeorm';
import { AdImg } from '@app/db/entity/ad-img.entity';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
    @InjectRepository(AdImg)
    private readonly adImgRepository: Repository<AdImg>
  ) {}

  async checkUpdate(appDto: AppDto): Promise<UpdateInfo> {
    const { appid } = appDto;
    const appinfo = await this.appRepository.findOne(appid);

    // 判断appid 是否存在
    if (!appinfo) {
      throw new HttpException('appid 错误', HttpStatus.FORBIDDEN);
    }

    let serverApp = appinfo.version.split('.');
    let clientApp = appDto.version.split('.');

    let updateInfo = {
      isUpdate: null, // 无需更新 0 热更新为 1  整包更新为 2   大版本更新为 3
      content: appinfo.content,
      updateUrl: null
    };

    if (Number(serverApp[2]) > Number(clientApp[2])) {
      // 热更新
      updateInfo.isUpdate = 1;
      updateInfo.updateUrl = appinfo.hot_url;
    } else if (Number(serverApp[1]) > Number(clientApp[1])) {
      // 整包更新
      updateInfo.isUpdate = 2;
      updateInfo.updateUrl = appinfo.pack_url;
    } else if (Number(serverApp[0]) > Number(clientApp[0])) {
      // 大版本更新
      updateInfo.isUpdate = 3;
      updateInfo.updateUrl = appinfo.pack_url;
    } else {
      // 无需更新
      updateInfo.isUpdate = 0;
      updateInfo.content = null;
    }

    return updateInfo;
  }

  async startAdimg(): Promise<AdImg> {
    return this.adImgRepository.findOne({ where: { type: 1, status: 1 } });
  }
}
