import { Book } from '@app/db/entity/book.entity';
import { Category } from '@app/db/entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookshopController } from './bookshop.controller';
import { BookshopService } from './bookshop.service';
import { UserActions } from '@app/db/entity/user-actions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book, UserActions])],
  controllers: [BookshopController],
  providers: [BookshopService]
})
export class BookshopModule {}
