import { Book } from '@app/db/entity/book.entity';
import { BookActions } from '../../../../libs/db/src/entity/book-actions.entity';
import { Client } from '@app/common/interface/client.interface';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService extends TypeOrmCrudService<Book> {
  constructor(
    @InjectRepository(Book) repo,
    @InjectRepository(BookActions)
    private readonly bookActionsRepository: Repository<BookActions>
  ) {
    super(repo);
  }

  async deleteManyBooks(idArr: number[]): Promise<Client> {
    const category = await this.repo.findByIds(idArr);
    return await this.repo
      .remove(category)
      .then(res => {
        return { code: 2000, message: '删除成功！', result: res };
      })
      .catch(err => {
        return { code: 2004, message: '删除失败，请稍后重试！' };
      });
  }

  async createOne(createBooksDto): Promise<Book> {
    createBooksDto.bookActions = await this.bookActionsRepository.save({});
    return await this.repo.save(createBooksDto);
  }
}
