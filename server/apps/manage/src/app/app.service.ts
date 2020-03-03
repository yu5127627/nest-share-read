import { App } from '@app/db/entity/app.entity';
import { AdImg } from '@app/db/entity/ad-img.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AdImg)
    private readonly adImgRepository: Repository<AdImg>,
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) {}

  async createAdImg(createAdImgDto): Promise<AdImg> {
    return this.adImgRepository.save(createAdImgDto);
  }

  async findAllAdImg(): Promise<AdImg[]> {
    return this.adImgRepository.find();
  }

  async editAdImg(id, editAdImgDto): Promise<AdImg> {
    const { type, url, is_href, href_url, categoryId, status } = editAdImgDto;
    let oldAdImg = await this.adImgRepository.findOne(id);
    oldAdImg.href_url = href_url;
    oldAdImg.type = type;
    oldAdImg.url = url;
    oldAdImg.is_href = is_href;
    oldAdImg.categoryId = categoryId;
    oldAdImg.status = status;
    return await this.adImgRepository.save(oldAdImg);
  }

  async delAdImg(id): Promise<any> {
    const adImg = await this.adImgRepository.findOne(id);
    return await this.adImgRepository.remove(adImg);
  }

  async getAppInfo(): Promise<App> {
    const appid = '__UNI__BF91653';
    return this.appRepository.findOne(appid);
  }

  async setAppInfo(app: App): Promise<App> {
    const { appid, hot_url, pack_url, content, version } = app;
    let appinfo = await this.appRepository.findOne(appid);
    appinfo.hot_url = hot_url;
    appinfo.pack_url = pack_url;
    appinfo.content = content;
    appinfo.version = version;

    return await this.appRepository.save(appinfo);
  }
}
