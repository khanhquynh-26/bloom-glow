import { Module } from '@nestjs/common';
import { AiGiftStudioController } from './ai-gift-studio.controller';
import { AiGiftStudioService } from './ai-gift-studio.service';

@Module({
  controllers: [AiGiftStudioController],
  providers: [AiGiftStudioService],
  exports: [AiGiftStudioService],
})
export class AiGiftStudioModule {}