import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productId: number;

  @Column({ default: 0 })
  stockQuantity: number;

  @UpdateDateColumn()
  updatedAt: Date;
}