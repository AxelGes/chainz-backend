import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { PlayerProfile } from './PlayerProfile';

@Entity()
export class Thebridge extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ name: 'games_played', default: 0 })
  gamesPlayed: number;

  @Column({ name: 'games_won', default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  kills: number;

  @Column({ default: 0 })
  deaths: number;

  // Column acts as an array
  @Column({ default: null, nullable: true })
  trails: string;

  @Column({ default: null, nullable: true })
  trail: number;

  @Column({ name: 'scored_points', default: 0 })
  scoredPoints: number;

  @OneToOne(() => PlayerProfile, (playerProfile) => playerProfile.thebridgeData)
  @JoinColumn({ name: 'uuid', referencedColumnName: 'uuid' })
  playerProfile: PlayerProfile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
