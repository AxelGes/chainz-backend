import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BaseEntity,
  JoinColumn
} from 'typeorm';
import { Skywars } from './Skywars';
@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  username: string;

  @Column({ nullable: false, unique: true })
  wallet: string;

  @Column({ default: 0 })
  coins: number;

  @Column({ nullable: false })
  last_connection: Date;

  @OneToOne(() => Skywars, skywars => skywars.player, { cascade: true })
  @JoinColumn()
  skywars: Skywars;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
