import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PlayerWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  uuid: string;

  @Column({ unique: true })
  wallet: string;

  @Column({ type: 'double', default: 0 })
  coins: number;

  @Column({ type: 'double', default: 0.1 })
  multiplier: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
