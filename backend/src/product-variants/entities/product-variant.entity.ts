
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ProductEntity } from '../../products/entities/product.entity';

@Entity('product_variants')
export class ProductVariantEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'product_id',
        type: 'int',
        unsigned: true,
    })
    productId: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        name: 'sku',
        type: 'varchar',
        length: 100,
        nullable: true,
        unique: true,
    })
    sku: string | null;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 12,
        scale: 2,
    })
    price: string;

    @Column({
        name: 'stock',
        type: 'int',
        default: 0,
    })
    stock: number;

    @Column({
        name: 'status',
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status: string;

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

    @ManyToOne(
        () => ProductEntity,
        {
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
    })
    product: ProductEntity;
}
