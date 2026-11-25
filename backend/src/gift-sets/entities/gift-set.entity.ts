import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('gift_sets')
export class GiftSetEntity {
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
        nullable: true,
    })
    description: string | null;

    @Column({
        name: 'image_url',
        type: 'varchar',
        length: 500,
        nullable: true,
    })
    imageUrl: string | null;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 12,
        scale: 2,
    })
    price: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status: string;

    @Column({
        name: 'stock',
        type: 'int',
        default: 0,
    })
    stock: number;

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
}
