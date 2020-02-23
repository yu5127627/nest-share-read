import { App } from '@app/db/entity/app.entity';
import { AppService } from './app.service';
import { Manager } from './../../../../libs/db/src/entity/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, App])],
  controllers: [SiteController],
  providers: [SiteService, AppService]
})
export class SiteModule {}
