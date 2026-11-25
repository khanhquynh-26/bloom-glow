
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',

  host: config.get<string>('DB_HOST', 'localhost'),
  port: Number(config.get('DB_PORT', 3306)),
  username: config.get<string>('DB_USERNAME', 'root'),
  password: config.get<string>('DB_PASSWORD', ''),
  database: config.get<string>('DB_NAME', 'bloom_glow'),

  charset: 'utf8mb4',
  timezone: 'Z',

  autoLoadEntities: true,

  // Không tự động thay đổi cấu trúc bảng.
  // Mọi thay đổi schema cần cập nhật file SQL của nhóm.
  synchronize: false,
});
