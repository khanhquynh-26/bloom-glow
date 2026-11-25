
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========================================
// REQUEST INTERCEPTOR
// Tự động gửi JWT token nếu đã đăng nhập
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bloom_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ========================================
// RESPONSE INTERCEPTOR
// Bóc lớp response.data của Backend
// ========================================

api.interceptors.response.use(
  (response) => {
    const body = response.data;

    // Backend trả về:
    // {
    //   success: true,
    //   data: {
    //     accessToken: "...",
    //     user: {...}
    //   },
    //   timestamp: "..."
    // }

    // Frontend chỉ cần phần data bên trong.
    if (
      body &&
      typeof body === 'object' &&
      body.success === true &&
      'data' in body
    ) {
      response.data = body.data;
    }

    return response;
  },

  (error) => {
    // Xử lý lỗi từ Backend
    // Không tự động xóa token tại đây.

    return Promise.reject(error);
  },
);

export default api;
