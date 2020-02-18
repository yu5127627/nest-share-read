import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { DbModule } from './../../../libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './manager/manager.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from 'libs/auth/src';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DbModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    BooksModule,
    UploadModule,
    SiteModule
  ]
})
export class Application {}
