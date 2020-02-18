import { Book } from '@app/db/entity/book.entity';
import { Category } from '@app/db/entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookshopController } from './bookshop.controller';
import { BookshopService } from './bookshop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  controllers: [BookshopController],
  providers: [BookshopService]
})
export class BookshopModule {}
