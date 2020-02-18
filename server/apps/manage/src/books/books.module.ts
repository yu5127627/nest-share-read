import { Book } from '../../../../libs/db/src/entity/book.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BooksService } from './books.service'
import { Module } from '@nestjs/common'
import { BooksController } from './books.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
