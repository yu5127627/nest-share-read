import { CommonModule } from './../../../libs/common/src/common.module';
import { DbModule } from './../../../libs/db/src/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth';
import { BookshopModule } from './bookshop/bookshop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    DbModule,
    AuthModule,
    BookshopModule,
    CommonModule
  ]
})
export class Application {}
