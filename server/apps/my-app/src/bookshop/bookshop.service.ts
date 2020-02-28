import { Client } from './../../../../libs/common/src/interface/client.interface';
import { CategoryBooks } from './interface/category-books.interface';
import { Category } from './../../../../libs/db/src/entity/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { Book } from '@app/db/entity/book.entity';
import { UserActions } from '@app/db/entity/user-actions.entity';

@Injectable()
export class BookshopService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(UserActions)
    private readonly userActionsRepository: Repository<UserActions>
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
    let book = await this.bookRepository.findOne(id, {
      relations: ['category', 'bookActions']
    });
    book.bookActions.browse_count++;
    return await this.bookRepository.save(book); // save 时级联自动保存
  }

  async favStatus(id, userId): Promise<{ isFav: number }> {
    // 根据 用户id 查询关联的用户活动表
    let { fav_list } = await getRepository(UserActions)
      .createQueryBuilder('user_actions')
      .where('user_actions.userId = :userId', { userId })
      .getOne();
    const favList = JSON.parse(fav_list);
    // 0:未收藏   1:已收藏
    if (favList.includes(Number(id))) {
      return { isFav: 1 };
    } else {
      return { isFav: 0 };
    }
  }

  async downBook(id: number): Promise<void> {
    let book = await this.bookRepository.findOne(id, {
      relations: ['bookActions']
    });
    book.bookActions.down_count++;
    await this.bookRepository.save(book); // save 时级联自动保存
  }

  async favBook(id: number, userId: number): Promise<Client> {
    // 定义返回信息
    let message: string = '';
    let code: number = 2000;
    let isFav: number = 0;

    // 根据 用户id 查询关联的用户活动表
    let userActions = await getRepository(UserActions)
      .createQueryBuilder('user_actions')
      .where('user_actions.userId = :userId', { userId })
      .getOne();

    // 添加图书收藏
    // 收藏列表转 json
    let fav_list: number[] = JSON.parse(userActions.fav_list);
    // 存在时取消收藏
    if (fav_list.includes(Number(id))) {
      fav_list = fav_list.filter(item => {
        return item != Number(id);
      });
      message = '取消收藏';
    } else {
      // 添加收藏
      fav_list.push(Number(id));
      isFav = 1;
      message = '添加收藏';
    }

    // json 转 string 赋值更新
    userActions.fav_list = JSON.stringify(fav_list);
    await this.userActionsRepository.save(userActions);

    // 图书活动表中收藏次数 +1
    let book = await this.bookRepository.findOne(id, {
      relations: ['bookActions']
    });
    book.bookActions.fav_count++;
    await this.bookRepository.save(book); // save 时级联自动保存

    return {
      message,
      code,
      result: {
        isFav
      }
    };
  }
}
