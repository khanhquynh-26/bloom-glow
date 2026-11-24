import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

/**
 * Lấy user đang đăng nhập từ request.
 * @CurrentUser() user: User   -> toàn bộ user
 * @CurrentUser('id') id: number -> một trường
 */
export const CurrentUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContext) => {
    const user: User | undefined = ctx.switchToHttp().getRequest().user;
    return field ? user?.[field] : user;
  },
);
