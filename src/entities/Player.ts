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
import { Thebridge } from './Thebridge';
@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  username: string;

  @Column({ nullable: true, unique: true })
  wallet: string;

  @Column({ type: 'float', default: 0 })
  coins: number;

  @Column({ type: 'float', default: 0.1 })
  multiplier: number;

  @Column({ name: "last_connection", nullable: true })
  lastConnection: Date;

  @OneToOne(() => Skywars, skywars => skywars.player, { cascade: true })
  @JoinColumn()
  skywars: Skywars;

  @OneToOne(() => Thebridge, thebridge => thebridge.player, { cascade: true })
  @JoinColumn()
  thebridge: Thebridge;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
