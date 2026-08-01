import api from './api';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail?: string;
}

export type CharacterCode =
  | 'YELLOW'
  | 'GRAY'
  | 'GREEN'
  | 'ORANGE'
  | 'PURPLE'
  | 'BLUE';

export type ProfileGender = 'MALE' | 'FEMALE';

export interface CreateProfileRequest {
  nickname: string;
  characterCode: CharacterCode;
  gender: ProfileGender;
  birthDate: string;
}

interface ProfileResult {
  nickname: string;
  characterCode: CharacterCode;
  gender: ProfileGender;
  birthDate: string;
}

export const createProfile = async (
  body: CreateProfileRequest,
): Promise<ProfileResult> => {
  const response = await api.post<ApiResponse<ProfileResult>>(
    '/api/users/me/profile',
    body,
  );

  return response.data.result;
};

export const uploadProfileImage = async (
  profileImage: File,
): Promise<string> => {
  const formData = new FormData();

  formData.append('profileImage', profileImage);

  const response = await api.patch<
    ApiResponse<{ profileImageUrl: string }>
  >('/api/users/me/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.result.profileImageUrl;
};

export interface MyInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  totalPoint: number;
}

export interface WithdrawalReason {
  reasonId: number;
  label: string;
}

interface WithdrawalReasonsResult {
  reasons: WithdrawalReason[];
}

export const getMyInfo = async (): Promise<MyInfo> => {
  const response = await api.get<ApiResponse<MyInfo>>(
    '/api/users/me',
  );

  return response.data.result;
};

export const getWithdrawalReasons = async (): Promise<
  WithdrawalReason[]
> => {
  const response = await api.get<
    ApiResponse<WithdrawalReasonsResult>
  >('/api/users/withdrawal-reasons');

  return response.data.result.reasons;
};

export const withdrawUser = async (
  reasonId: number,
): Promise<void> => {
  await api.post<ApiResponse<string>>(
    '/api/users/me/withdrawal',
    {
      reasonId,
    },
  );
};