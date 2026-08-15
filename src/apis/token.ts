import axios from 'axios';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail?: string | null;
}

interface ReissueResult {
  accessToken: string;
}

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')?.trim() ?? null;
};

export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const clearAuthData = (): void => {
  removeAccessToken();

  sessionStorage.removeItem('signupAgreedTermsIds');
  sessionStorage.removeItem('profileCreateCompleted');
};

export const reissueAccessToken = async (): Promise<string> => {

  try {
    const response = await refreshApi.post<ApiResponse<ReissueResult>>(
      '/api/auth/reissue',
    );

    const newAccessToken = response.data.result.accessToken;

    if (!newAccessToken) {
      throw new Error('재발급 응답에 Access Token이 없습니다.');
    }


    setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {

    throw error;
  }
};