
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('collections')
export class CollectionEntity {
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
        name: 'status',
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status: string;

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
}
