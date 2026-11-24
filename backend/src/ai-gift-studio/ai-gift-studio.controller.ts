import { Body, Controller, Post } from '@nestjs/common';
import {
  AiGiftStudioService,
  GiftSuggestInputDto,
} from './ai-gift-studio.service';

@Controller('ai-gift-studio')
export class AiGiftStudioController {
  constructor(private readonly aiGiftStudioService: AiGiftStudioService) {}

  @Post('suggest')
  suggest(@Body() dto: GiftSuggestInputDto) {
    return this.aiGiftStudioService.suggest(dto);
  }
}