import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from 'typeorm';
import { Player } from './Player';

@Entity()
export class Skywars extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  games_played: number;

  @Column()
  games_won: number;

  @Column()
  kills: number;

  @Column()
  deaths: number;

  @OneToOne(() => Player, player => player.skywars, {
    nullable: false
  })
  player: Player;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
