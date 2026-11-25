import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GiftSetEntity } from './entities/gift-set.entity';

import { GiftSetsController } from './gift-sets.controller';
import { GiftSetsService } from './gift-sets.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GiftSetEntity,
        ]),
    ],
    controllers: [
        GiftSetsController,
    ],
    providers: [
        GiftSetsService,
    ],
    exports: [
        GiftSetsService,
    ],
})
export class GiftSetsModule {}
