import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionEntity } from './entities/collection.entity';

import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CollectionEntity,
        ]),
    ],
    controllers: [
        CollectionsController,
    ],
    providers: [
        CollectionsService,
    ],
    exports: [
        CollectionsService,
    ],
})
export class CollectionsModule {}
