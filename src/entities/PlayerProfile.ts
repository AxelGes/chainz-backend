import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

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
}
