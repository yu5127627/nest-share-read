import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Actions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  down_count: number;

  @Column({ default: 0 })
  browse_count: number;

  @Column({ default: 0 })
  fav_count: number;
}
