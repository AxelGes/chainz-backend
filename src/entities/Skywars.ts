import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Player } from './Player';

@Entity()
export class Skywars extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "games_played", default: 0 })
  gamesPlayed: number;

  @Column({ name: "games_won", default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  kills: number;

  @Column({ default: 0 })
  deaths: number;

  @OneToOne(() => Player, player => player.skywars, {
    nullable: false
  })
  player: Player;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
