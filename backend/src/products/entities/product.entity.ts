import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from '../../categories/entities/category.entity';
import { ProductImageEntity } from '../../product-images/entities/product-image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  slug: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 15,
    scale: 0,
  })
  price: string;

  @Column({
    name: 'stock',
    type: 'int',
  })
  stock: number;

  @Column({
    name: 'category_id',
    type: 'int',
    unsigned: true,
  })
  categoryId: number;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 500,
  })
  imageUrl: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];
}
