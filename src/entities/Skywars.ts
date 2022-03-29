import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'Skywars' })
export class Skywars extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ default: null, nullable: true })
  kits: string;

  @Column({ default: null, nullable: true })
  abilities: string;

  @Column({ default: null, nullable: true, name: 'last_colour' })
  lastColour: string;

  @Column({ default: null, nullable: true, name: 'last_kit' })
  lastKit: string;

  @Column({ name: 'games_played', default: 0 })
  gamesPlayed: number;

  @Column({ name: 'games_won', default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  kills: number;

  @Column({ default: 0 })
  deaths: number;

  @Column({ default: 0, name: 'arrow_shot' })
  arrowShot: number;

  @Column({ default: 0, name: 'arrow_hit' })
  arrowHit: number;

  @Column({ default: 0, name: 'blocks_broken' })
  blocksBroken: number;

  @Column({ default: 0, name: 'blocks_placed' })
  blocksPlaced: number;

  @Column({ default: 0, name: 'time_played' })
  timePlayed: number;

  @Column({ default: 0, name: 'distance_walked' })
  distanceWalked: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
