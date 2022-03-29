import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity({ name: 'PlayerWallet' })
export class PlayerWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  uuid: string;

  @Column({ unique: true })
  wallet: string;

  @Column({ type: 'float', default: 0 })
  coins: number;

  @Column({ type: 'float', default: 0.1 })
  multiplier: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
