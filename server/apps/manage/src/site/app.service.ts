import { App } from '@app/db/entity/app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) {}

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
