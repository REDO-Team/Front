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
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization =
        /^Bearer\s+/i.test(accessToken)
          ? accessToken
          : `Bearer ${accessToken}`;

    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {

    const originalRequest = error.config as
      | RetryRequestConfig
      | undefined;

    if (!originalRequest) {
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

    if (
      !isUnauthorized ||
      originalRequest._retry ||
      isExcludedRequest
    ) {

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken =
        await reissueAccessToken();

      originalRequest.headers =
        originalRequest.headers ?? {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (reissueError) {

      clearAuthData();

      return Promise.reject(reissueError);
    }
  },
);

export default api;