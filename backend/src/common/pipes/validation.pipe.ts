import { ValidationPipe } from '@nestjs/common';

/**
 * - whitelist: bỏ trường thừa
 * - forbidNonWhitelisted: báo lỗi nếu client gửi trường không có trong DTO
 *   (vd: client không thể tự gửi role: 'admin' khi đăng ký)
 * - transform: tự ép kiểu theo DTO
 */
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }
}
