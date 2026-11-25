
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

@Entity('product_images')
export class ProductImageEntity {
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
        name: 'image_url',
        type: 'varchar',
        length: 500,
    })
    imageUrl: string;

    @Column({
        name: 'alt_text',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    altText: string | null;

    @Column({
        name: 'is_primary',
        type: 'boolean',
        default: false,
    })
    isPrimary: boolean;

    @Column({
        name: 'sort_order',
        type: 'int',
        default: 0,
    })
    sortOrder: number;

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
        (product) => product.images,
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
