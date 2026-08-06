import api from './api';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail?: string;
}

interface LoginIdCheckResult {
  isAvailable: boolean;
}

export const checkLoginId = async (
  loginId: string,
): Promise<boolean> => {
  const response = await api.get<ApiResponse<LoginIdCheckResult>>(
    '/api/auth/login-id/check',
    {
      params: {
        loginId,
      },
    },
  );

  return response.data.result.isAvailable;
};

export const sendEmailVerification = async (
  email: string,
): Promise<void> => {
  await api.post<ApiResponse<string>>(
    '/api/auth/email/verify-request',
    {
      email,
    },
  );
};

export const verifyEmailCode = async (
  email: string,
  code: string,
): Promise<void> => {
  await api.post<ApiResponse<string>>(
    '/api/auth/email/verify-confirm',
    {
      email,
      code,
    },
  );
};

export const signup = async (
  loginId: string,
  email: string,
  password: string,
  agreedTermsIds: number[],
) => {
  const response = await api.post<ApiResponse<{
    userId: number;
    accessToken: string;
  }>>('/api/auth/signup', {
    signupType: 'GENERAL',
    loginId,
    email,
    password,
    agreedTermsIds,
  });

  return response.data.result;
};

export const logout = async (): Promise<void> => {
  await api.post<ApiResponse<string>>(
    '/api/auth/logout',
  );
};