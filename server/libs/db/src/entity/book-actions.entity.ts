import { Book } from '@app/db/entity/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class BookActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  down_count: number;

  @Column({ default: 0 })
  browse_count: number;

  @Column({ default: 0 })
  fav_count: number;

  @OneToOne(
    type => Book,
    book => book.bookActions
  )
  book: Book;
}
