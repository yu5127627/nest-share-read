import { AuthGuard } from '@nestjs/passport';
import { BookshopService } from './bookshop.service';
import { Client } from './../../../../libs/common/src/interface/client.interface';
import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('bookshop')
@ApiTags('书城')
export class BookshopController {
  constructor(private readonly bookshopService: BookshopService) {}

  @Get('category')
  @ApiOperation({ summary: '所有图书类别' })
  async findAllCategory(): Promise<Client> {
    const allCategory = await this.bookshopService.findAllCategory();
    return {
      code: 2000,
      message: '查询类别成功！',
      result: allCategory
    };
  }

  @Get('category/:id')
  @ApiOperation({ summary: '按类别查询图书' })
  async findCategoryBooks(@Param('id') id: number): Promise<Client> {
    const categoryBooks = await this.bookshopService.findCategoryBooks(id);
    return {
      code: 2000,
      message: '查询类别图书成功！',
      result: categoryBooks
    };
  }

  @Get('book/:id')
  @ApiOperation({ summary: '查询一本图书' })
  async findBook(@Param('id') id: number): Promise<Client> {
    const book = await this.bookshopService.findBook(id);
    return {
      code: 2000,
      message: '查询图书成功！',
      result: book
    };
  }

  @Get('book/down/:id')
  @ApiOperation({ summary: '下载一本图书' })
  async downBook(@Param('id') id: number): Promise<Client> {
    await this.bookshopService.downBook(id);
    return {
      code: 2000,
      message: '图书下载请求已提交！'
    };
  }

  @Get('book/fav/:id')
  @UseGuards(AuthGuard('myapp-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '收藏一本图书' })
  async favBook(@Request() req, @Param('id') id: number): Promise<Client> {
    const userId = req.user.id;
    return await this.bookshopService.favBook(id, userId);
  }
}
