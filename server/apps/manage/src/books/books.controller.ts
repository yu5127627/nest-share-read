import { AuthGuard } from '@nestjs/passport';
import { Client } from '@app/common/interface/client.interface';
import { ReplaceBooksDto } from './dto/replace-books.dto';
import { CreateBooksDto } from './dto/create-books.dto';
import { BooksService } from './books.service';
import { Book } from '../../../../libs/db/src/entity/book.entity';
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Crud({
  model: {
    type: Book
  },
  dto: {
    create: CreateBooksDto,
    replace: ReplaceBooksDto
  },
  routes: {
    exclude: ['updateOneBase', 'createManyBase']
  },
  query: {
    maxLimit: 100,
    join: {
      category: {
        eager: true,
        persist: ['zh_name'], // 默认存在的字段
        exclude: ['en_name'] // 指定排除的字段
      },
      actions: {
        eager: true
      }
    }
  }
})
@Controller('books')
@UseGuards(AuthGuard('manage-jwt'))
@ApiBearerAuth()
@ApiTags('图书模块')
export class BooksController implements CrudController<Book> {
  constructor(public service: BooksService) {}

  @Delete()
  @ApiOperation({ summary: '批量删除图书' })
  async deleteManyBooks(@Body() idArr: number[]): Promise<Client> {
    return await this.service.deleteManyBooks(idArr);
  }

  @Override()
  async createOne(
    @ParsedBody() createBooksDto: CreateBooksDto
  ): Promise<Client> {
    const book = await this.service.createOne(createBooksDto);
    return {
      code: 2000,
      message: '新增图书成功',
      result: book
    };
  }
}
