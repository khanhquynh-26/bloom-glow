import { Body, Controller, Post } from '@nestjs/common';
import { AiAssistantService, ChatResponseDto } from './ai-assistant.service';
import { ChatDto } from './dto/chat.dto';

@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('chat')
  chat(@Body() dto: ChatDto): ChatResponseDto {
    return this.aiAssistantService.reply(dto);
  }
}