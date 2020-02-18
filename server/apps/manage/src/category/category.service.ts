import { Client } from '@app/common/interface/client.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category as CategoryInterface } from './interface/category.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '@app/db/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findAllCategory(): Promise<CategoryInterface[]> {
    return await this.categoryRepository.find();
  }

  async createCategory(
    createDto: CreateCategoryDto
  ): Promise<CategoryInterface> {
    const { zh_name, en_name } = createDto;
    return await this.categoryRepository.save({ zh_name, en_name });
  }

  async updateCategory(
    id: number,
    updateCategoryDto: CreateCategoryDto
  ): Promise<CategoryInterface> {
    let category = await this.categoryRepository.findOne(id);
    category.zh_name = updateCategoryDto.zh_name;
    category.en_name = updateCategoryDto.en_name;
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<Client> {
    const category = await this.categoryRepository.findOne(id);
    return await this.categoryRepository
      .delete(category)
      .then(res => {
        return { code: 2003, message: '删除成功！', result: res };
      })
      .catch(err => {
        return { code: 2004, message: '删除失败，请稍后重试！' };
      });
  }

  async deleteManyCategory(idArr: number[]): Promise<Client> {
    const category = await this.categoryRepository.findByIds(idArr);
    return await this.categoryRepository
      .remove(category)
      .then(res => {
        return { code: 2003, message: '删除成功！', result: res };
      })
      .catch(err => {
        return { code: 2004, message: '删除失败，请稍后重试！' };
      });
  }
}
