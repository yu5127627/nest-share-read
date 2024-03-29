import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { App } from '@app/db/entity/app.entity';
import { AdImg } from '@app/db/entity/ad-img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([App, AdImg])],
  controllers: [UpdateController],
  providers: [UpdateService]
})
export class UpdateModule {}
