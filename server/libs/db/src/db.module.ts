import { AdImg } from './entity/ad-img.entity';
import { UserActions } from './entity/user-actions.entity';
import { BookActions } from './entity/book-actions.entity';
import { User } from '@app/db/entity/user.entity';
import { Manager } from './entity/manager.entity';
import { Book } from './entity/book.entity';
import { Category } from './entity/category.entity';
import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entity/email.entity';
import { App } from './entity/app.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: Number(process.env.DB_PORT),
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
          Category,
          Book,
          Manager,
          User,
          Email,
          App,
          BookActions,
          UserActions,
          AdImg
        ],
        synchronize: true
      })
    })
  ],
  providers: [DbService],
  exports: [DbService]
})
export class DbModule {}
