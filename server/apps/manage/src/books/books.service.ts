import { Client } from '@app/common/interface/client.interface';
import { Book } from '../../../../libs/db/src/entity/book.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService extends TypeOrmCrudService<Book> {
  constructor(@InjectRepository(Book) repo) {
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
}
