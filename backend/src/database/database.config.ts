import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get<string>('DB_HOST', 'localhost'),
  port: Number(config.get('DB_PORT', 3306)),
  username: config.get<string>('DB_USERNAME', 'root'),
  password: config.get<string>('DB_PASSWORD', ''),
  database: config.get<string>('DB_NAME', 'bloom_glow'),
  charset: 'utf8mb4',
  timezone: 'Z', // lưu/đọc giờ UTC -> JSON trả về ISO 8601
  autoLoadEntities: true, // entity nào đăng ký trong forFeature() sẽ tự được nạp
  synchronize: false, // KHÔNG tự đổi schema, mọi thay đổi bảng phải sửa bloom_glow.sql và báo nhóm
});
