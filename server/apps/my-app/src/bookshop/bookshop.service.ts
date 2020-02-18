import { CategoryBooks } from './interface/category-books.interface';
import { Category } from './../../../../libs/db/src/entity/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@app/db/entity/book.entity';

@Injectable()
export class BookshopService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async findAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findCategoryBooks(category: number): Promise<CategoryBooks[]> {
    const categoryBooks = await this.bookRepository.find({
      select: ['id', 'zh_name', 'cover'],
      where: { category },
      take: 20
    });
    const categoryHotBooks = await this.bookRepository.find({
      select: ['id', 'zh_name', 'cover'],
      where: { category, is_hot: 1 }
    });
    const categoryNewBooks = await this.bookRepository.find({
      select: ['id', 'zh_name', 'cover'],
      where: { category, is_new: 1 }
    });
    const categoryRecommendBooks = await this.bookRepository.find({
      select: ['id', 'zh_name', 'cover'],
      where: { category, is_recommend: 1 }
    });

    const result = [
      {
        title: '热门图书',
        book: categoryHotBooks
      },
      {
        title: '推荐图书',
        book: categoryRecommendBooks
      },
      {
        title: '最新上架',
        book: categoryNewBooks
      },
      {
        title: '系列图书',
        book: categoryBooks
      }
    ];
    return result;
    // categoryBooks,
    // categoryHotBooks,
    // categoryNewBooks,
    // categoryRecommendBooks
  }

  async findBook(id: number): Promise<Book> {
    return this.bookRepository.findOne(id, { relations: ['category'] });
  }
}
