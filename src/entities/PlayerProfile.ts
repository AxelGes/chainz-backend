import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Thebridge } from './Thebridge';
import { Skywars } from './Skywars';

@Entity()
export class PlayerProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true, name: 'friend_requests' })
  friendRequests: boolean;

  @Column({ default: true, name: 'party_requests' })
  partyRequests: boolean;

  @Column({ default: true })
  msg: boolean;

  @Column({ default: true })
  chat: boolean;

  @Column({ default: true })
  ads: boolean;

  @Column({ default: 0 })
  exp: number;

  @Column({ default: 0 })
  level: number;

  @OneToOne(() => Thebridge, thebridge => thebridge.playerProfile)
  thebridgeData: Thebridge;

  @OneToOne(() => Skywars, skywars => skywars.playerProfile)
  skywarsData: Skywars;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
