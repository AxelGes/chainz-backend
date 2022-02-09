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
export class Thebridge extends BaseEntity {
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

  @Column({ name: "scored_points", default: 0 })
  scoredPoints: number;

  @OneToOne(() => Player, player => player.thebridge, {
    nullable: false
  })
  player: Player;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
