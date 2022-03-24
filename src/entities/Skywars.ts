import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Player } from './Player';

@Entity()
export class Skywars extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  kits: string;

  @Column({ default: null, nullable: true })
  abilities: string;

  @Column({ default: null, nullable: true })
  last_colour: string;

  @Column({ name: "games_played", default: 0 })
  gamesPlayed: number;

  @Column({ name: "games_won", default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  kills: number;

  @Column({ default: 0 })
  deaths: number;

  @Column({ default: 0 })
  arrow_shot: number;

  @Column({ default: 0 })
  arrow_hit: number;

  @Column({ default: 0 })
  blocks_broken: number;

  @Column({ default: 0 })
  blocks_placed: number;

  @Column({ default: 0 })
  time_played: number;

  @Column({ default: 0 })
  distance_walked: number;

  @OneToOne(() => Player, player => player.skywars, {
    nullable: false
  })
  @JoinColumn({ name: "player_id" })
  player: Player;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
