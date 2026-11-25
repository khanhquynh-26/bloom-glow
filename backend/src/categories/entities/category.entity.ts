import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';

import { ProductEntity } from '../../products/entities/product.entity';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        unique: true,
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

    @OneToMany(
        () => ProductEntity,
        (product) => product.category,
    )
    products: ProductEntity[];
}