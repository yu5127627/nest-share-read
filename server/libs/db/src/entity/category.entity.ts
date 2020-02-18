import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  zh_name: string

  @Column()
  en_name: string

  @OneToMany(
    type => Book,
    book => book.category
  )
  @JoinColumn()
  book: Book
}