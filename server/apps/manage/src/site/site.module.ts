import { Manager } from './../../../../libs/db/src/entity/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
