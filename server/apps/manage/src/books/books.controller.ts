import { AuthGuard } from '@nestjs/passport';
import { Client } from '@app/common/interface/client.interface';
import { ReplaceBooksDto } from './dto/replace-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';
import { CreateBooksDto } from './dto/create-books.dto';
import { BooksService } from './books.service';
import { Book } from '../../../../libs/db/src/entity/book.entity';
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Crud({
  model: {
    type: Book
  },
  dto: {
    create: CreateBooksDto,
    update: UpdateBooksDto,
    replace: ReplaceBooksDto
  },
  routes: {
    exclude: ['updateOneBase']
  },
  query: {
    maxLimit: 100,
    join: {
      category: {
        eager: true,
        persist: ['zh_name'],
        exclude: ['id', 'en_name']
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
}
