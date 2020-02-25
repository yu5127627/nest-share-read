import { User } from '@app/db/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class UserActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '[]' })
  fav_list: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
