import axios, { AxiosError } from 'axios';

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
  console.log('========== ACCESS TOKEN REISSUE ==========');
  console.log('[REISSUE] API URL :', import.meta.env.VITE_API_URL);
  console.log('[REISSUE] 요청 시작');

  try {
    const response = await refreshApi.post<ApiResponse<ReissueResult>>(
      '/api/auth/reissue',
    );

    console.log('[REISSUE] 응답 상태 :', response.status);

    const newAccessToken = response.data.result.accessToken;

    if (!newAccessToken) {
      console.error('[REISSUE] Access Token 없음');
      throw new Error('재발급 응답에 Access Token이 없습니다.');
    }


    setAccessToken(newAccessToken);

    console.log('[REISSUE] LocalStorage 저장 완료');

    return newAccessToken;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error('========== REISSUE ERROR ==========');
    console.error('Status :', axiosError.response?.status);
    console.error('Message :', axiosError.message);

    throw error;
  }
};