import axios from 'axios';
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  clearAuthData,
  getAccessToken,
  reissueAccessToken,
} from './token';

interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    console.log('========== API REQUEST ==========');
    console.log('[REQUEST] method:', config.method);
    console.log('[REQUEST] url:', config.url);
    console.log(
      '[REQUEST] baseURL:',
      config.baseURL,
    );
    console.log(
      '[REQUEST] withCredentials:',
      config.withCredentials,
    );

    if (accessToken) {
      config.headers.Authorization =
        /^Bearer\s+/i.test(accessToken)
          ? accessToken
          : `Bearer ${accessToken}`;

    }

    return config;
  },
  (error: AxiosError) => {
    console.error(
      '[REQUEST INTERCEPTOR ERROR]',
      error,
    );

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log('========== API RESPONSE ==========');
    console.log('[RESPONSE] url:', response.config.url);
    console.log('[RESPONSE] status:', response.status);

    return response;
  },
  async (error: AxiosError) => {
    console.error('========== API ERROR ==========');
    console.error(
      '[ERROR] status:',
      error.response?.status,
    );
    console.error(
      '[ERROR] url:',
      error.config?.url,
    );
    console.error(
      '[ERROR] method:',
      error.config?.method,
    );
    console.error(
      '[ERROR] message:',
      error.message,
    );

    const originalRequest = error.config as
      | RetryRequestConfig
      | undefined;

    if (!originalRequest) {
      console.error(
        '[INTERCEPTOR] 기존 요청 정보가 없습니다.',
      );

      return Promise.reject(error);
    }

    const isUnauthorized =
      error.response?.status === 401;

    const excludedUrls = [
      '/api/auth/login',
      '/api/auth/signup',
      '/api/auth/reissue',
      '/api/auth/logout',
      '/api/auth/login/naver',
      '/api/auth/login/kakao',
      '/api/auth/login/google',
      '/api/auth/login-id/check',
      '/api/auth/email/verify-request',
      '/api/auth/email/verify-confirm',
    ];

    const isExcludedRequest =
      excludedUrls.some((url) =>
        originalRequest.url?.includes(url),
      );

    console.log(
      '========== INTERCEPTOR CHECK ==========',
    );
    console.log(
      '[INTERCEPTOR] 401 여부:',
      isUnauthorized,
    );
    console.log(
      '[INTERCEPTOR] 제외 API 여부:',
      isExcludedRequest,
    );
    console.log(
      '[INTERCEPTOR] 이미 재시도했는지:',
      Boolean(originalRequest._retry),
    );

    if (
      !isUnauthorized ||
      originalRequest._retry ||
      isExcludedRequest
    ) {
      console.log(
        '[INTERCEPTOR] 재발급을 시도하지 않습니다.',
      );

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    console.log(
      '[INTERCEPTOR] Access Token 재발급 시작',
    );

    try {
      const newAccessToken =
        await reissueAccessToken();

      console.log(
        '[INTERCEPTOR] Access Token 재발급 성공',
      );
      console.log(
        '[INTERCEPTOR] 기존 요청 재시도:',
        originalRequest.url,
      );

      originalRequest.headers =
        originalRequest.headers ?? {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (reissueError) {
      const axiosError =
        reissueError as AxiosError;

      console.error(
        '========== REISSUE FINAL ERROR ==========',
      );
      console.error(
        '[INTERCEPTOR] 재발급 실패 status:',
        axiosError.response?.status,
      );
      console.error(
        '[INTERCEPTOR] 재발급 실패 message:',
        axiosError.message,
      );

      clearAuthData();

      console.log(
        '[INTERCEPTOR] 인증 데이터 삭제 완료',
      );

      // 디버깅 중에는 페이지 이동을 막아두는 게 좋음
      // window.location.replace('/login');

      return Promise.reject(reissueError);
    }
  },
);

export default api;