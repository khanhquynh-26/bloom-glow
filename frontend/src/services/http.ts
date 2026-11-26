const BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export const TOKEN_KEY = 'bloom_token';
export const USER_KEY = 'bloom_user';
export const AUTH_EXPIRED_EVENT = 'auth:expired';

export class ApiRequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
  }
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Có lỗi xảy ra, vui lòng thử lại';
}

/**
 * Gọi API của backend. Backend trả { success, data, timestamp } nên hàm này
 * trả thẳng phần `data`; khi lỗi sẽ ném ApiRequestError kèm message tiếng Việt.
 */
export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiRequestError('Không kết nối được máy chủ, vui lòng kiểm tra backend', 0);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.success) {
    // Token hết hạn / không hợp lệ -> báo cho AuthContext đăng xuất
    if (response.status === 401 && token) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    const message = Array.isArray(body?.message)
      ? body.message.join('\n')
      : (body?.message ?? 'Có lỗi xảy ra, vui lòng thử lại');
    throw new ApiRequestError(message, response.status);
  }

  return body.data as T;
}
