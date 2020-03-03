import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Book } from './book.entity';
import { AdImg } from './ad-img.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zh_name: string;

  @Column()
  en_name: string;

  @OneToMany(
    type => AdImg,
    adImg => adImg.category
  )
  adImg: AdImg[];

  @OneToMany(
    type => Book,
    book => book.category
  )
  book: Book[];
}
