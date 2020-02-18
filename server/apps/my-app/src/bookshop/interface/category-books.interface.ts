import { Book } from '@app/db/entity/book.entity';

export interface CategoryBooks {
  readonly title: string;
  readonly book: Book[];
}
