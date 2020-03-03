import { App } from '@app/db/entity/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdImg } from '@app/db/entity/ad-img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdImg, App])],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
