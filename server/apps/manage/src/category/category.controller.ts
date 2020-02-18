import { RolesGuard } from './../../../../libs/auth/src/roles.guard';
import { Client } from '@app/common/interface/client.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@app/common/decorator/roles.decorator';

@Controller('category')
@UseGuards(AuthGuard('manage-jwt'), RolesGuard)
@Roles('admin')
@ApiBearerAuth()
@ApiTags('书籍类别')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '查询所有图书分类' })
  async findAllCategory(@Request() req): Promise<Client> {
    const allCategory = await this.categoryService.findAllCategory();
    return {
      code: 2000,
      message: '查询图书分类成功。',
      result: allCategory
    };
  }

  @Post()
  @ApiOperation({ summary: '增加图书分类' })
  async createCategory(@Body() createDto: CreateCategoryDto): Promise<Client> {
    const category = await this.categoryService.createCategory(createDto);
    return {
      code: 2001,
      message: '创建图书分类成功！',
      result: category
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改图书分类' })
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto
  ): Promise<Client> {
    const category = await this.categoryService.updateCategory(
      id,
      updateCategoryDto
    );
    return {
      code: 2002,
      message: '编辑图书分类成功！',
      result: category
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除单个图书分类' })
  async deleteCategory(@Param('id') id: number): Promise<Client> {
    return await this.categoryService.deleteCategory(id);
  }

  @Delete()
  @ApiOperation({ summary: '删除多个图书分类' })
  async deleteManyCategory(@Body() idArr: number[]): Promise<Client> {
    return await this.categoryService.deleteManyCategory(idArr);
  }
}
